import { Certificate } from '@aws-cdk/aws-certificatemanager'
import { CfnOutput } from '@aws-cdk/core'
import { B, be_ } from '@ctx-core/object'
import type { aws_Ctx } from '../aws_Ctx.js'
const key = 'local_az_certificate'
export const local_az_certificate_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	const { construct } = ctx
	const local_az_certificate = Certificate.fromCertificateArn(
		construct,
		'local_az_certificate',
		process.env.LOCAL_AZ_AWS_CERTIFICATE_ARN as string,
	)
	new CfnOutput(construct, 'local_az_certificate.certificateArn', {
		value: local_az_certificate.certificateArn
	})
	return local_az_certificate as local_az_certificate_T
})
export type local_az_certificate_T = Certificate
