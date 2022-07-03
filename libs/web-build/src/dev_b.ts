import { be_ } from '@ctx-core/object'
import { mode_b } from './mode_b.js'
import type { web_build_Ctx } from './web_build_Ctx.js'
const key = 'dev'
export function dev_b(ctx):dev_T {
	return be_<web_build_Ctx, typeof key>(key, ctx=>{
		const mode = mode_b(ctx)
		return mode === 'development'
	})(ctx)
}
export type dev_T = boolean
