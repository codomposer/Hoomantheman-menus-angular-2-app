import { assign, B, be_, clone } from '@ctx-core/object'
import { subscribe } from '@ctx-core/store'
import { consumer_http_client_b, search_dish_requestData_, } from '@menus/consumer-http'
import type { DishType_I } from '@menus/dish'
import { SearchMenuRequestQuery, SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import { search_dish_requestQuery$_b } from './search_dish_requestQuery$_b.js'
// import { Enable_Dish_Filter$_b } from '@menus/platform-settings'
import type { search_menu_Ctx } from './search_menu_Ctx.js'
const key = 'search_dish_a$'
export const search_dish_a$_b:B<search_menu_Ctx, typeof key> = be_(key, (ctx)=>{
	// const Enable_Dish_Filter$ = Enable_Dish_Filter$_b(ctx)
	const consumer_http_client = consumer_http_client_b(ctx)
	const search_dish_requestQuery$ = search_dish_requestQuery$_b(ctx)
	let debounce_requestData:SearchMenuRequestQuery
	const search_dish_a$ = refresh_writable_([])
	assign(search_dish_a$, {
		refresh, reset
	})
	subscribe(search_dish_requestQuery$, load_search_dish)
	return search_dish_a$ as search_dish_a$_T
	async function load_search_dish(search_dish_requestQuery:SearchMenuRequestQuery_I) {
		//  || !Enable_Dish_Filter$.$
		if (!search_dish_requestQuery) {
			search_dish_a$.set(null)
			return
		}
		const requestData = search_dish_requestData_(clone(search_dish_requestQuery))
		debounce_requestData = requestData
		console.debug('search_dish_a$|debug|1', {
			search_dish_requestQuery,
			requestData,
		})
		const payload = await consumer_http_client.search_dish(requestData)
		console.debug('search_dish_a$|debug|2', {
			requestData, payload,
		})
		if (debounce_requestData !== requestData) return
		console.debug('search_dish_a$|debug|3', {
			requestData, payload,
		})
		search_dish_a$.$ = payload.Data
	}
	function refresh() {
		search_dish_a$.$ = search_dish_a$.$
	}
	function reset() {
		search_dish_a$.$ = []
	}
})
export type search_dish_a$_T = refresh_writable_T<DishType_I[]>
