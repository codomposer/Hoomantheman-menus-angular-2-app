import { B, be_ } from '@ctx-core/object'
import { multi_subscribe } from '@ctx-core/store'
import { cuisines_busy$_b, selected_cuisines$_b } from '@menus/search-menu-common'
import { delivery_fee$_b, max_price$_b, min_order$_b, min_price$_b, proximity$_b } from '@menus/filters-common'
import { userAddress_coordinate_, userAddress$_b } from '@menus/consumer-user-address'
import { serviceType$_b, ServiceTypeId } from '@menus/service-type'
import { search_cuisine_requestData_, consumer_http_client_b } from '@menus/consumer-http'
import { LatLng_ } from '@menus/geolocatable'
import type { search_menu_Ctx } from './search_menu_Ctx.js'
const key = 'load_cuisines'
export const load_cuisines_b:B<search_menu_Ctx, typeof key> = be_(key, ctx=>{
	const cuisines_busy$ = cuisines_busy$_b(ctx)
	const userAddress$ = userAddress$_b(ctx)
	const min_price$ = min_price$_b(ctx)
	const max_price$ = max_price$_b(ctx)
	const serviceType$ = serviceType$_b(ctx)
	const delivery_fee$ = delivery_fee$_b(ctx)
	const min_order$ = min_order$_b(ctx)
	const proximity$ = proximity$_b(ctx)
	const selected_cuisines$ = selected_cuisines$_b(ctx)
	const consumer_http_client = consumer_http_client_b(ctx)
	multi_subscribe([
		userAddress$,
		min_price$,
		max_price$,
		delivery_fee$,
		min_order$,
		proximity$,
		serviceType$,
	], load_cuisines)
	return load_cuisines as load_cuisines_T
	async function load_cuisines() {
		cuisines_busy$.set(true)
		const requestData = search_cuisine_requestData_()
		requestData.page = 1
		const userAddress = userAddress$.$
		if (userAddress) {
			requestData.coordinate = userAddress_coordinate_(LatLng_(userAddress))
		}
		requestData.min_price = min_price$.$
		requestData.max_price = max_price$.$
		requestData.menuType = ServiceTypeId[serviceType$.$]
		requestData.deliveryfee = delivery_fee$.$
		requestData.minimumorder = min_order$.$
		requestData.proximity = proximity$.$
		const payload = await consumer_http_client.search_cuisine(requestData)
		const cuisines = payload.Data
		const selected_cuisines = selected_cuisines$.$
		for (const i in cuisines) {
			if (!cuisines.hasOwnProperty(i)) continue
			const cuisine = cuisines[i]
			for (const j in selected_cuisines) {
				if (!selected_cuisines.hasOwnProperty(j)) continue
				const selectedCuisine = selected_cuisines[j]
				if (cuisine.id === selectedCuisine.id) {
					cuisine.is_selected = true
					break
				}
			}
		}
		cuisines_busy$.set(false)
	}
})
export type load_cuisines_T = ()=>Promise<void>
