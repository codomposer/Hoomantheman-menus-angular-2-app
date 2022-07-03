import { Distribution, OriginAccessIdentity } from '@aws-cdk/aws-cloudfront'
import { S3Origin } from '@aws-cdk/aws-cloudfront-origins'
import type { B } from '@ctx-core/object'
import { be_ } from '@ctx-core/object'
import { CfnOutput } from '@aws-cdk/core'
import type { aws_Ctx } from '../aws_Ctx.js'
import { images_host_b } from '../common/index.js'
import { images_assets_bucket_b } from './images_assets_bucket_b.js'
import { images_certificate_b } from './images_certificate_b.js'
const key = 'images_distribution'
export const images_distribution_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	const { construct } = ctx
	const images_certificate = images_certificate_b(ctx)
	const images_assets_bucket = images_assets_bucket_b(ctx)
	const originAccessIdentity = new OriginAccessIdentity(construct, 'images_OriginAccessIdentity')
	images_assets_bucket.grantRead(originAccessIdentity)
	const distribution = new Distribution(construct, 'images_Distribution', {
		defaultRootObject: 'index.html',
		domainNames: [images_host_b(ctx)],
		certificate: images_certificate,
		defaultBehavior: {
			origin: new S3Origin(images_assets_bucket, { originAccessIdentity }),
		},
	})
	new CfnOutput(construct, `${key}.distributionDomainName`, {
		value: distribution.distributionDomainName,
	})
	new CfnOutput(construct, `${key}.distributionId`, {
		value: distribution.distributionId,
	})
	return distribution
})
export type images_distribution_T = Distribution
