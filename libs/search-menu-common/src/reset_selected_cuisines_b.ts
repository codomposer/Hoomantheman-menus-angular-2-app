import { B, be_ } from '@ctx-core/object'
import { selected_cuisines_, selected_cuisines$_b } from './selected_cuisines$_b.js'
import { cuisines$_b } from './cuisines$_b.js'
import type { search_menu_common_Ctx } from './search_menu_common_Ctx.js'
const key = 'reset_selected_cuisines'
export const reset_selected_cuisines_b:B<search_menu_common_Ctx, typeof key> = be_(key, ctx=>{
	const cuisines$ = cuisines$_b(ctx)
	const selected_cuisines$ = selected_cuisines$_b(ctx)
	return reset_selected_cuisines as reset_selected_cuisines_T
	function reset_selected_cuisines() {
		const cuisines = cuisines$.$
		for (const cuisine of cuisines) {
			cuisine.is_selected = false
		}
		selected_cuisines$.set(selected_cuisines_())
	}
})
export type reset_selected_cuisines_T = ()=>void
