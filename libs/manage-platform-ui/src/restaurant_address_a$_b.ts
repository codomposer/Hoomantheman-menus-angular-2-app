import { B, be_ } from '@ctx-core/object'
import { has_dom } from '@ctx-core/dom'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import type { Address } from '@menus/address'
import { RoRequestQuery, API_RESTAURANT_list_b } from '@menus/ro-http'
import { STATUS_SUCCESS } from '@menus/web-config'
import type { RoRestaurant } from '@menus/ro-restaurant'
import { manage_platform_busy$_b } from './manage_platform_busy$_b.js'
import type { manage_platform_ui_Ctx } from './manage_platform_ui_Ctx.js'
const key = 'restaurant_address_a$'
export const restaurant_address_a$_b:B<manage_platform_ui_Ctx, typeof key> = be_<manage_platform_ui_Ctx, typeof key>(key, function (ctx) {
	const API_RESTAURANT_list = API_RESTAURANT_list_b(ctx)
	const manage_platform_busy$ = manage_platform_busy$_b(ctx)
	const restaurant_address_a$ = refresh_writable_<Address[]>([]) as restaurant_address_a$_T
	if (has_dom) {
		load().then()
	}
	return restaurant_address_a$
	async function load() {
		manage_platform_busy$.$ = true
		try {
			// Rest List
			const API_RESTAURANT_list_payload = await API_RESTAURANT_list(new RoRequestQuery())
			if (API_RESTAURANT_list_payload.Status === STATUS_SUCCESS) {
				const restaurant_a = API_RESTAURANT_list_payload.Data as RoRestaurant[]
				const restaurant_address_a = restaurant_address_a$.$ || []
				restaurant_address_a.push(...restaurant_a.map(restaurant=>({
					Address: `${restaurant.Address_1} ${restaurant.Address_2} ${restaurant.City} ${restaurant.State} ${restaurant.ZipCode}`,
					City: restaurant.City,
					State: restaurant.State,
					Zip: restaurant.ZipCode,
					Country: '',
					LatLng: `${restaurant.Latitude},${restaurant.Longitude}`
				} as Address)))
				restaurant_address_a$.$ = restaurant_address_a
			}
		} finally {
			manage_platform_busy$.$ = false
		}
	}
})
export type restaurant_address_a$_T = refresh_writable_T<Address[]>
