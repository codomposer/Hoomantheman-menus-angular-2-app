import { run } from '@ctx-core/function'
import { B, be_ } from '@ctx-core/object'
import { has_dom } from '@ctx-core/dom'
import type { Writable$ } from '@ctx-core/store'
import { AutoSuggestList, AutoSuggestList_I } from '@menus/consumer-user-common'
import { UserAddress, userAddress$_b, userAddress_coordinate_ } from '@menus/consumer-user-address'
import { SearchMenuRequestQuery } from '@menus/search-menu-common'
import { consumer_http_client_b } from '@menus/consumer-http'
import { LatLng_ } from '@menus/geolocatable'
import { idb_writable_ } from '@menus/idb'
import type { consumer_user_Ctx } from './consumer_user_Ctx.js'
const key = 'autoSuggestList$'
export const autoSuggestList$_b:B<consumer_user_Ctx, typeof key> = be_(key, ctx=>{
	let search_menus_menuRequestData = new SearchMenuRequestQuery()
	const userAddress$ = userAddress$_b(ctx)
	const consumer_http_client = consumer_http_client_b(ctx)
	const autoSuggestList$ = idb_writable_<AutoSuggestList_I>(
		'autoSuggestList$', autoSuggestList_
	) as autoSuggestList$_T
	if (has_dom) {
		run(async ()=>{
			userAddress$.subscribe(async (userAddress)=>{
				const coordinate = userAddress_coordinate_(LatLng_(userAddress))

				// Only update auto suggest list if address is changed (avoid duplicate events)
				if(search_menus_menuRequestData.coordinate !== coordinate) {
					const autoSuggestList = await update_autoSuggestList(userAddress)
					autoSuggestList$.set(autoSuggestList)
				}
			})
		}).then()
	}
	return autoSuggestList$
	async function update_autoSuggestList(userAddress) {
		if (userAddress === undefined) {
			autoSuggestList$.set(new AutoSuggestList())
			return new AutoSuggestList()
		}
		search_menus_menuRequestData = new SearchMenuRequestQuery()
		if(userAddress) {
			search_menus_menuRequestData.coordinate = userAddress_coordinate_(LatLng_(userAddress))
		}
		search_menus_menuRequestData.recache = 1
		search_menus_menuRequestData.option = 1
		return await consumer_http_client.search_menus_autosuggest(search_menus_menuRequestData)
	}
})
export function autoSuggestList_(autoSuggestList?:AutoSuggestList_I) {
	return autoSuggestList == null ? new AutoSuggestList() : autoSuggestList
}
export interface autoSuggestList$_T extends Writable$<AutoSuggestList_I> {}
