import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import {
	default_location$_b, default_location$_T, userAddress$_b, userAddress$_T, userAddress_coordinate_
} from '@menus/consumer-user-address'
import { deep_equal } from '@menus/fast-deep-equal'
import {
	delivery_fee$_b, max_price$_b, min_order$_b, min_price$_b, proximity$_b, search_keyword_a$_b, delivery_fee$_T,
	min_order$_T, max_price$_T, min_price$_T, proximity$_T, search_keyword_a$_T
} from '@menus/filters-common'
import { LatLng_ } from '@menus/geolocatable'
import { map_center$_b, map_center$_T } from '@menus/maps'
import { selected_cuisines$_b, SearchMenuRequestQuery_I, selected_cuisines$_T } from '@menus/search-menu-common'
import { serviceType$_b, serviceType$_T } from '@menus/service-type'
import { DEFAULT_LAT, DEFAULT_LNG } from '@menus/web-config'
import type { search_menu_Ctx } from './search_menu_Ctx.js'
const key = 'search_dish_requestQuery$'
export const search_dish_requestQuery$_b:B<search_menu_Ctx, typeof key> = be_(key, ctx=>{
	const search_dish_requestQuery$ = derived$<[
		serviceType$_T,
		search_keyword_a$_T,
		userAddress$_T,
		min_price$_T,
		max_price$_T,
		delivery_fee$_T,
		min_order$_T,
		proximity$_T,
		selected_cuisines$_T,
		map_center$_T,
		default_location$_T,
	], SearchMenuRequestQuery_I>([
		serviceType$_b(ctx),
		search_keyword_a$_b(ctx),
		userAddress$_b(ctx),
		min_price$_b(ctx),
		max_price$_b(ctx),
		delivery_fee$_b(ctx),
		min_order$_b(ctx),
		proximity$_b(ctx),
		selected_cuisines$_b(ctx),
		map_center$_b(ctx),
		default_location$_b(ctx),
	], search_dish_requestQuery_)
	return search_dish_requestQuery$ as search_dish_requestQuery$_T
	function search_dish_requestQuery_(
		[
			serviceType,
			search_text,
			userAddress,
			min_price,
			max_price,
			delivery_fee,
			min_order,
			proximity,
			selected_cuisines,
			map_center,
			default_location,
		], set
	) {
		if (
			!serviceType
			|| search_text === undefined
			|| userAddress === undefined
			|| min_price === undefined
			|| max_price === undefined
			|| delivery_fee === undefined
			|| min_order === undefined
			|| proximity === undefined
			|| selected_cuisines === undefined
		) {
			set(undefined)
			return
		}
		const search_dish_requestQuery = {
			menuType: serviceType,
			keywords: search_text,
			coordinate:
				userAddress_coordinate_(LatLng_(userAddress))
				|| userAddress_coordinate_(map_center)
				|| userAddress_coordinate_(default_location)
				|| `${DEFAULT_LNG},${DEFAULT_LAT}`,
			min_price: min_price,
			max_price: max_price,
			deliveryfee: delivery_fee,
			minimumorder: min_order,
			proximity: proximity,
			cuisineID: (selected_cuisines || []).map(cuisine=>cuisine.id).join(','),
		} as SearchMenuRequestQuery_I
		if (!deep_equal(search_dish_requestQuery$.$, search_dish_requestQuery)) {
			set(search_dish_requestQuery)
		}
	}
})
export type search_dish_requestQuery$_T = Readable$<SearchMenuRequestQuery_I>
