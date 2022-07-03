import { B, be_, assign } from '@ctx-core/object'
import { readable, Readable$ } from '@ctx-core/store'
import type { search_menu_Ctx } from './search_menu_Ctx.js'
const key = 'search_menus_menuitems_page$'
export const search_menus_menuitems_page$_b:B<search_menu_Ctx, typeof key> = be_(key, ()=>{
	let set_search_menus_menuitems_page
	const search_menus_menuitems_page$ = assign(readable(search_menus_menuitems_(), set=>{
		set_search_menus_menuitems_page = set
	}), {
		reset,
		increment,
	}) as search_menus_menuitems_page$_T
	return search_menus_menuitems_page$
	function reset() {
		set_search_menus_menuitems_page = search_menus_menuitems_()
	}
	function increment() {
		set_search_menus_menuitems_page(search_menus_menuitems_page$.$ + 1)
	}
})
export function search_menus_menuitems_(search_menus_menuitems?:number):number {
	return search_menus_menuitems ? 1 : search_menus_menuitems
}
export interface search_menus_menuitems_page$_T extends Readable$<number> {
	reset():void
	increment():void
}
