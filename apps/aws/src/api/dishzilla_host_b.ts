import { CfnOutput } from '@aws-cdk/core'
import { B, be_ } from '@ctx-core/object'
import type { aws_Ctx } from '../aws_Ctx.js'
const key = 'dishzilla_host'
export const dishzilla_host_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
		const { stage, construct } = ctx
		const dishzilla_host =
			stage === 'live'
			? 'dishzilla.com'
			: 'dev.dishzilla.com'
		new CfnOutput(construct, 'dishzilla-fqdn', {
			value: `https://${dishzilla_host}`
		})
		return dishzilla_host
	}
)
export type dishzilla_host_T = string
