import { Certificate, ICertificate } from '@aws-cdk/aws-certificatemanager'
import { CfnOutput } from '@aws-cdk/core'
import { B, be_ } from '@ctx-core/object'
import type { aws_Ctx } from '../aws_Ctx.js'
import { CertificateArn } from './CertificateArn.js'
const key = 'certificate'
export const certificate_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	const { construct } = ctx
	const certificate = Certificate.fromCertificateArn(
		construct, 'Certificate', CertificateArn)
	new CfnOutput(construct, 'certificate.certificateArn', {
		value: certificate.certificateArn
	})
	return certificate
})
export type certificate_T = ICertificate
