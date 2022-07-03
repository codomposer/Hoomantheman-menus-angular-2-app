import { B, be_ } from '@ctx-core/object'
import { is_navigating$_b } from './is_navigating$_b.js'
import type { page_Ctx } from './page_Ctx.js'
const key = 'hide_navigating'
export const hide_navigating_b:B<page_Ctx, typeof key> = be_(key, ctx=>{
	const is_navigating$ = is_navigating$_b(ctx)
	return hide_navigating as hide_navigating_T
	function hide_navigating() {
		is_navigating$.$ = false
	}
})
export type hide_navigating_T = ()=>void
