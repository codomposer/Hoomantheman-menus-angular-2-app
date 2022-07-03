import { B, be_ } from '@ctx-core/object'
import type { Cuisine } from '@menus/cuisine'
import { idb_writable_, idb_writable_T } from '@menus/idb'
import type { search_menu_common_Ctx } from './search_menu_common_Ctx.js'
const key = 'selected_cuisines$'
export const selected_cuisines$_b:B<search_menu_common_Ctx, typeof key> = be_(key, ()=>
	idb_writable_<Cuisine[]>('selected_cuisines', selected_cuisines=>{
		return selected_cuisines == null ? [] : selected_cuisines
	}) as selected_cuisines$_T
)
export function selected_cuisines_(selected_cuisines?:Cuisine[]):Cuisine[] {
	return selected_cuisines == null ? [] : selected_cuisines
}
export type selected_cuisines$_T = idb_writable_T<Cuisine[]>
