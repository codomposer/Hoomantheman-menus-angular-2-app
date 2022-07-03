import { B, be_ } from '@ctx-core/object'
import { Certificate, ICertificate } from '@aws-cdk/aws-certificatemanager'
import type { aws_Ctx } from '../aws_Ctx.js'
const key = 'images_certificate'
export const images_certificate_b:B<aws_Ctx, typeof key> = be_(key, ctx=>
	Certificate.fromCertificateArn(ctx.construct, 'images_certificate', process.env.AWS_IMAGES_CERTIFICATE_ARN)
)
export type images_certificate_T = ICertificate
