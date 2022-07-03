import { B, be_ } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { Address } from '@menus/address'
import { restaurant_address_a$_b } from './restaurant_address_a$_b.js'
import type { manage_platform_ui_Ctx } from './manage_platform_ui_Ctx.js'
const key = 'selected_restaurant_address$'
export const selected_restaurant_address$_b:B<manage_platform_ui_Ctx, typeof key> = be_(key, function (ctx) {
	const restaurant_address_a$ = restaurant_address_a$_b(ctx)
	const selected_restaurant_address$ = writable$(null) as selected_restaurant_address$_T
	restaurant_address_a$.subscribe(restaurant_address_a=>{
		if (!restaurant_address_a?.length) {
			selected_restaurant_address$.set(null)
			return
		}
		const selected_restaurant_address = selected_restaurant_address$.$
		if (
			selected_restaurant_address
			&& (
				restaurant_address_a.find(restaurant_address=>
					restaurant_address.LatLng === selected_restaurant_address.LatLng
				)
			)
		) {
			return
		}
		selected_restaurant_address$.set(restaurant_address_a[0])
	})
	return selected_restaurant_address$
})
export type selected_restaurant_address$_T = Writable$<Address>
