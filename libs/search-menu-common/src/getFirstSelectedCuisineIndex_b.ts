import { B, be_ } from '@ctx-core/object'
import type { Cuisine } from '@menus/cuisine'
import { selected_cuisines$_b } from './selected_cuisines$_b.js'
import type { search_menu_common_Ctx } from './search_menu_common_Ctx.js'
const key = 'getFirstSelectedCuisineIndex'
export const getFirstSelectedCuisineIndex_b:B<search_menu_common_Ctx, typeof key> = be_(key, ctx=>{
	const selected_cuisines$ = selected_cuisines$_b(ctx)
	return getFirstSelectedCuisineIndex as getFirstSelectedCuisineIndex_T
	function getFirstSelectedCuisineIndex(cuisine:Cuisine) {
		let index = null
		const selected_cuisines = selected_cuisines$.$
		for (const i in selected_cuisines) {
			if (!selected_cuisines.hasOwnProperty(i)) continue
			const select_cuisine = selected_cuisines[i]
			if (select_cuisine.id === cuisine.id) {
				index = i
				break
			}
		}
		return index
	}
})
export type getFirstSelectedCuisineIndex_T = (cuisine:Cuisine)=>number
