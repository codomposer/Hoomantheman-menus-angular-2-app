import { CfnOutput } from '@aws-cdk/core'
import { B, be_ } from '@ctx-core/object'
import type { aws_Ctx } from '../aws_Ctx.js'
const key = 'images_host'
export const images_host_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	const { stage, construct } = ctx
	const images_host =
		stage === 'live'
		? 'live.images.menu.com'
		: stage === 'dev'
			? 'dev.images.menu.com'
			: 'dev-new.images.menu.com'
	new CfnOutput(construct, 'images-fqdn', {
		value: `https://${images_host}`
	})
	return images_host as images_host_T
})
export type images_host_T = string
