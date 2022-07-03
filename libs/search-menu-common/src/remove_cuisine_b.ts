import { B, be_ } from '@ctx-core/object'
import { selected_cuisines$_b } from './selected_cuisines$_b.js'
import type { search_menu_common_Ctx } from './search_menu_common_Ctx.js'
const key = 'remove_cuisine'
export const remove_cuisine_b:B<search_menu_common_Ctx, typeof key> = be_(key, ctx=>{
	const selected_cuisines$ = selected_cuisines$_b(ctx)
	return remove_cuisine as remove_cuisine_T
	function remove_cuisine(index:number) {
		selected_cuisines$.update(
			in_selected_cuisines=>{
				const selected_cuisines = in_selected_cuisines.slice()
				selected_cuisines.splice(index, 1)
				return selected_cuisines
			}
		)
	}
})
export type remove_cuisine_T = (index:number)=>void
