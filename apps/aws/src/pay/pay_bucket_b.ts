import { B, be_ } from '@ctx-core/object'
import { CfnOutput } from '@aws-cdk/core'
import { Bucket } from '@aws-cdk/aws-s3'
import { Effect, ManagedPolicy, PolicyStatement } from '@aws-cdk/aws-iam'
import type { aws_Ctx } from '../aws_Ctx.js'
import { pay_host_b } from './pay_host_b.js'
import { pay_user_b } from './pay_user_b.js'
const key = 'pay_bucket'
export const pay_bucket_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	if (!~['live', 'dev'].indexOf(ctx.stage)) return
	const { construct } = ctx
	const pay_host = pay_host_b(ctx)
	const pay_bucket = new Bucket(construct, `${pay_host}.images_assets`, {
		bucketName: pay_host,
		publicReadAccess: true,
		websiteIndexDocument: 'index.html',
	})
	new CfnOutput(construct, 'pay_bucket.bucketArn', {
		value: pay_bucket.bucketArn,
	})
	new CfnOutput(construct, 'pay_bucket.bucketName', {
		value: pay_bucket.bucketName,
	})
	new CfnOutput(construct, 'pay_bucket.bucketWebsiteUrl', {
		value: pay_bucket.bucketWebsiteUrl,
	})
	const pay_user = pay_user_b(ctx)
	const pay_s3_policy = new ManagedPolicy(construct, 'pay-s3-policy', {
		statements: [
			new PolicyStatement({
				effect: Effect.ALLOW,
				resources: [
					pay_bucket.bucketArn,
					`${pay_bucket.bucketArn}/*`,
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
	pay_user.addManagedPolicy(pay_s3_policy)
	return pay_bucket
})
export type pay_bucket_T = Bucket
