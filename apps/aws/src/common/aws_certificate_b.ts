import { Certificate } from '@aws-cdk/aws-certificatemanager'
import { CfnOutput } from '@aws-cdk/core'
import { B, be_ } from '@ctx-core/object'
import { aws_env } from '../aws_env.js'
import type { aws_Ctx } from '../aws_Ctx.js'
const key = 'aws_certificate'
export const aws_certificate_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	const { construct } = ctx
	const aws_certificate = Certificate.fromCertificateArn(
		construct,
		'local_az_pay_certificate',
		aws_env.AWS_CERTIFICATE_ARN,
	)
	new CfnOutput(construct, 'local_az_pay_certificate.certificateArn', {
		value: aws_certificate.certificateArn
	})
	return aws_certificate as aws_certificate_T
})
export type aws_certificate_T = Certificate
