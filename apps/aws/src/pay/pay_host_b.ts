import { CfnOutput } from '@aws-cdk/core'
import { B, be_ } from '@ctx-core/object'
import type { aws_Ctx } from '../aws_Ctx.js'
const key = 'pay_host'
export const pay_host_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	if (!~['live', 'dev'].indexOf(ctx.stage)) return
	const { stage, construct } = ctx
	const pay_host = pay_host_(stage)
	new CfnOutput(construct, 'pay-fqdn', {
		value: `https://${pay_host}`
	})
	return pay_host as pay_host_T
})
export function pay_host_(stage:string) {
	return (
		stage === 'live'
		? 'pay.menu.com'
		: 'dev.pay.menu.com'
	)
}
export type pay_host_T = string
