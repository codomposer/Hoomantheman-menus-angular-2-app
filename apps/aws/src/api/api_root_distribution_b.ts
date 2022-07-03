import type { B } from '@ctx-core/object'
import type { CloudFrontWebDistribution } from '@aws-cdk/aws-cloudfront'
import { distribution__b } from '../common/index.js'
import { aws_env } from '../aws_env.js'
import { api_host_b } from './api_host_b.js'
import { api_apigateway_b } from './api_apigateway_b.js'
import type { aws_Ctx } from '../aws_Ctx.js'
const key = 'api_root_distribution'
export const api_root_distribution_b:B<aws_Ctx, typeof key> = distribution__b<typeof key>(key, {
	host_(ctx) {
		return api_host_b(ctx)
	},
	distribution_name_(_ui_ctx) {
		return 'api_root_distribution'
	},
	acmCertRef_(_ui_ctx) {
		return aws_env.AWS_CERTIFICATE_ARN
	},
	apigateway_b: api_apigateway_b,
})
export type api_root_distribution_T = CloudFrontWebDistribution
