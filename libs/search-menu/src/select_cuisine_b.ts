import { B, be_ } from '@ctx-core/object'
import type { Cuisine } from '@menus/cuisine'
import { add_cuisine_b, getFirstSelectedCuisineIndex_b, remove_cuisine_b, } from '@menus/search-menu-common'
import type { search_menu_Ctx } from './search_menu_Ctx.js'
const key = 'select_cuisine'
export const select_cuisine_b:B<search_menu_Ctx, typeof key> = be_(key, ctx=>{
	const getFirstSelectedCuisineIndex = getFirstSelectedCuisineIndex_b(ctx)
	const add_cuisine = add_cuisine_b(ctx)
	const remove_cuisine = remove_cuisine_b(ctx)
	return select_cuisine as select_cuisine_T
	function select_cuisine(cuisine:Cuisine) {
		const selectedCuisineIndex = getFirstSelectedCuisineIndex(cuisine)
		if (selectedCuisineIndex) {
			cuisine.is_selected = false
			remove_cuisine(selectedCuisineIndex)
		} else {
			cuisine.is_selected = true
			add_cuisine(cuisine)
		}
	}
})
export type select_cuisine_T = (cuisine:Cuisine)=>void
