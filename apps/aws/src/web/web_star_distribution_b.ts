import type { CloudFrontWebDistribution } from '@aws-cdk/aws-cloudfront'
import type { B } from '@ctx-core/object'
import { distribution__b } from '../common/index.js'
import { aws_env } from '../aws_env.js'
import { web_host_b } from './web_host_b.js'
import type { aws_Ctx } from '../aws_Ctx.js'
import { web_apigateway_b } from './web_apigateway_b.js'
const key = 'web_star_distribution'
export const web_star_distribution_b:B<aws_Ctx, typeof key> = distribution__b<typeof key>(key, {
	host_(ctx) {
		return `*.${web_host_b(ctx)}`
	},
	distribution_name_(_ui_ctx):string {
		return 'web_star_distribution'
	},
	acmCertRef_(_ui_ctx) {
		return aws_env.AWS_CERTIFICATE_ARN
	},
	apigateway_b: web_apigateway_b,
})
export type web_star_distribution_T = CloudFrontWebDistribution
