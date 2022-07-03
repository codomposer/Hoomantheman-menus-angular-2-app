import { B, be_ } from '@ctx-core/object'
import type { Cuisine } from '@menus/cuisine'
import { selected_cuisines$_b } from './selected_cuisines$_b.js'
import type { search_menu_common_Ctx } from './search_menu_common_Ctx.js'
const key = 'add_cuisine'
export const add_cuisine_b:B<search_menu_common_Ctx, typeof key> = be_(key, ctx=>{
	const selected_cuisines$ = selected_cuisines$_b(ctx)
	return add_cuisine as add_cuisine_T
	function add_cuisine(cuisine:Cuisine) {
		selected_cuisines$.update(
			in_selected_cuisines=>{
				const selected_cuisines = in_selected_cuisines.slice()
				selected_cuisines.push(cuisine)
				return selected_cuisines
			}
		)
	}
})
export type add_cuisine_T = (cuisine:Cuisine)=>void
