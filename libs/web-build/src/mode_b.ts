import { be_ } from '@ctx-core/object'
import type { web_build_Ctx } from './web_build_Ctx.js'
const key = 'mode'
export function mode_b(ctx):mode_T {
	return be_<web_build_Ctx, typeof key>(key, ()=>process.env.NODE_ENV || 'development')(ctx)
}
export type mode_T = string
