import { CfnOutput } from '@aws-cdk/core'
import { Bucket, IBucket } from '@aws-cdk/aws-s3'
import { Effect, ManagedPolicy, PolicyStatement } from '@aws-cdk/aws-iam'
import { B, be_ } from '@ctx-core/object'
import { images_host_b } from '../common/index.js'
import type { aws_Ctx } from '../aws_Ctx.js'
import { api_user_b } from './api_user_b.js'
const key = 'images_assets_bucket'
export const images_assets_bucket_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	const { construct, stage } = ctx
	const images_host = images_host_b(ctx)
	const images_assets_bucket =
		stage === 'dev'
		? Bucket.fromBucketArn(construct, `${images_host}.images_assets`, process.env.DEV_IMAGES_BUCKET_ARN)
		: stage === 'live'
		? Bucket.fromBucketArn(construct, `${images_host}.images_assets`, process.env.LIVE_IMAGES_BUCKET_ARN)
		: new Bucket(construct, `${images_host}.images_assets`, {
			bucketName: images_host,
			publicReadAccess: true,
			websiteIndexDocument: 'index.html',
		})
	images_assets_bucket.grantPublicAccess('*', 's3:GetObject', 's3:GetObjectVersion')
	images_assets_bucket.addToResourcePolicy(PolicyStatement.fromJson({
		'Sid': 'PublicRead',
		'Effect': 'Allow',
		'Principal': '*',
		'Action': ['s3:GetObject', 's3:GetObjectVersion'],
		'Resource': [images_assets_bucket.bucketArn, `${images_assets_bucket.bucketArn}/*`]
	}))
	new CfnOutput(construct, 'images_assets_bucket.bucketArn', {
		value: images_assets_bucket.bucketArn,
	})
	new CfnOutput(construct, 'images_assets_bucket.bucketName', {
		value: images_assets_bucket.bucketName,
	})
	new CfnOutput(construct, 'images_assets_bucket.bucketWebsiteUrl', {
		value: images_assets_bucket.bucketWebsiteUrl,
	})
	const api_user = api_user_b(ctx)
	const api_s3_policy = new ManagedPolicy(construct, 'api-s3-policy', {
		statements: [
			new PolicyStatement({
				effect: Effect.ALLOW,
				resources: [
					images_assets_bucket.bucketArn,
					`${images_assets_bucket.bucketArn}/*`,
				],
				actions: [
					's3:GetBucketLocation',
					's3:GetObject',
					's3:ListBucket',
					's3:ListAllMyBuckets',
					's3:PutObject',
					's3:DeleteObject',
				],
			})
		]
	})
	api_user.addManagedPolicy(api_s3_policy)
	return images_assets_bucket
})
export type images_assets_bucket_T = IBucket
