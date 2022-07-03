import { CfnOutput } from '@aws-cdk/core'
import { B, be_ } from '@ctx-core/object'
import type { aws_Ctx } from '../aws_Ctx.js'
const key = 'web_host'
export const web_host_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	const { stage, construct } = ctx
	const web_host =
		stage === 'live'
		? 'menu.com'
		: 'dev.menu.com'
	if (!web_host) {
		throw 'Invalid stage'
	}
	new CfnOutput(construct, 'web-fqdn', {
		value: `https://${web_host}`
	})
	return web_host
})
export type web_host_T = string
