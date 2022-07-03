import { B, be_, assign, clone } from '@ctx-core/object'
import { Writable$, subscribe, writable$ } from '@ctx-core/store'
import { search_menus_menuname_requestData_, consumer_http_client_b } from '@menus/consumer-http'
import type { SearchDishType, SearchMenuRequestQuery } from '@menus/search-menu-common'
import { search_dish_requestQuery$_b, search_dish_requestQuery$_T } from './search_dish_requestQuery$_b.js'
import type { search_menu_Ctx } from './search_menu_Ctx.js'
const key = 'search_dishTypes$'
export const search_dishTypes$_b:B<search_menu_Ctx, typeof key> = be_(key, ctx=>{
	const consumer_http_client = consumer_http_client_b(ctx)
	const search_dish_requestQuery$:search_dish_requestQuery$_T = search_dish_requestQuery$_b(ctx)
	let debounce_requestData:SearchMenuRequestQuery
	const search_dishTypes$ = writable$(search_dishTypes_())
	assign(search_dishTypes$, {
		refresh, reset
	})
	subscribe(search_dish_requestQuery$, load_search_dishTypes)
	return search_dishTypes$ as search_dishTypes$_T
	async function load_search_dishTypes(search_dish_requestQuery) {
		if (!search_dish_requestQuery) {
			search_dishTypes$.set(null)
			return
		}
		// const requestData = search_menus_menuname_requestData_(clone(search_dish_requestQuery))
		// debounce_requestData = requestData
		// const payload = await consumer_http_client.search_menus_menuname(requestData)
		// if (debounce_requestData !== requestData) return
		// search_dishTypes$.set(payload.Table || payload.Table1)
	}
	function refresh() {
		search_dishTypes$.set(search_dishTypes$.$)
	}
	function reset() {
		search_dishTypes$.set(search_dishTypes_())
	}
})
export function search_dishTypes_(search_dishTypes?:SearchDishType[]) {
	return search_dishTypes == null ? [] : search_dishTypes
}
export interface search_dishTypes$_T extends Writable$<SearchDishType[]> {
	refresh():void
	reset():void
}
