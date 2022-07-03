import { be_ } from '@ctx-core/object'
import { svg_preprocess_, svg_preprocess_T as in_svg_preprocess_T } from '@ctx-core/svg'
import type { web_build_Ctx } from './web_build_Ctx.js'
const key = 'svg_preprocess'
export function svg_preprocess_b(ctx:web_build_Ctx):svg_preprocess_T {
	return be_<web_build_Ctx, typeof key>(key, ()=>svg_preprocess_())(ctx)
}
export type svg_preprocess_T = in_svg_preprocess_T
