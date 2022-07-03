import { B, be_ } from '@ctx-core/object'
import type { aws_Ctx } from '../aws_Ctx.js'
const key = 'NODE_ENV'
export const NODE_ENV_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	const { stage } = ctx
	return stage_h_NODE_ENV[stage]
})
enum stage_h_NODE_ENV {
	dev = 'staging',
	live = 'production',
}
export type NODE_ENV_T = string
