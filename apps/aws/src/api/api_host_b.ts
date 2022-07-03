import { CfnOutput } from '@aws-cdk/core'
import { B, be_ } from '@ctx-core/object'
import type { aws_Ctx } from '../aws_Ctx.js'
const key = 'api_host'
export const api_host_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	const { stage, construct } = ctx
	const api_host = `${stage}.api.menu.com`
	new CfnOutput(construct, 'api-fqdn', {
		value: `https://${api_host}`
	})
	return api_host
})
export type api_host_T = string
