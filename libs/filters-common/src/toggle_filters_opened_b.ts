import { B, be_ } from '@ctx-core/object'
import { assign_to_query_goto_b } from '@menus/page'
import { is_filters_opened$_b } from './is_filters_opened$_b.js'
import type { filters_common_Ctx } from './filters_common_Ctx.js'
const key = 'toggle_filters_opened'
export const toggle_filters_opened_b:B<filters_common_Ctx, typeof key> = be_(key, ctx=>{
	const assign_to_query_goto = assign_to_query_goto_b(ctx)
	const is_filters_opened$ = is_filters_opened$_b(ctx)
	return toggle_filters_opened as toggle_filters_opened_T
	async function toggle_filters_opened() {
		await assign_to_query_goto({
			is_filters_opened: is_filters_opened$.$ ? '0' : '1'
		})
	}
})
export type toggle_filters_opened_T = ()=>Promise<void>
