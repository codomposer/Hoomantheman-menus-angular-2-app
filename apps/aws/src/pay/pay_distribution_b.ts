import type { CloudFrontWebDistribution } from '@aws-cdk/aws-cloudfront'
import type { B } from '@ctx-core/object'
import type { aws_Ctx } from '../aws_Ctx.js'
import { distribution__b, aws_certificate_b } from '../common/index.js'
import { pay_host_b } from './pay_host_b.js'
import { pay_apigateway_b } from './pay_apigateway_b.js'
const key = 'pay_distribution'
export const pay_distribution_b:B<aws_Ctx, typeof key> = distribution__b<typeof key>(key, {
	host_(ctx) {
		return pay_host_b(ctx)
	},
	distribution_name_(_ui_ctx) {
		return 'pay_distribution'
	},
	acmCertRef_(ui_ctx) {
		return aws_certificate_b(ui_ctx).certificateArn
	},
	apigateway_b: pay_apigateway_b,
})
export type pay_distribution_T = CloudFrontWebDistribution
