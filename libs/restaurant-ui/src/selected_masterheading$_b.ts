import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { Masterheading_I } from '@menus/consumer-menu'
import { restaurant_frame$_b, RestaurantFrame_I } from '@menus/restaurant-frame'
import type { restaurant_ui_Ctx } from './restaurant_ui_Ctx.js'
const key = 'selected_masterheading$'
export const selected_masterheading$_b:B<restaurant_ui_Ctx, typeof key> = be_(key, ctx=>{
	const selected_masterheading$ = writable$<Masterheading_I>(null)
	const restaurant_frame$ = restaurant_frame$_b(ctx)
	restaurant_frame$.subscribe((restaurant_frame:RestaurantFrame_I)=>{
		if (
			!restaurant_frame || !restaurant_frame.masterheadings?.length
		) {
			selected_masterheading$.$ = null
			return
		}
		const selected_masterheading = selected_masterheading$.$
		const selected_restaurant_frame_masterheading =
			selected_masterheading
			&& (
				restaurant_frame.masterheadings.find(
					masterheading=>masterheading.Mhid === selected_masterheading.Mhid
				)
			)
		if (selected_restaurant_frame_masterheading) {
			if (selected_restaurant_frame_masterheading !== selected_masterheading) {
				selected_masterheading$.$ = selected_restaurant_frame_masterheading
			}
		} else {
			selected_masterheading$.$ = restaurant_frame.masterheadings?.[0]
		}
	})
	return selected_masterheading$ as selected_masterheading$_T
})
export type selected_masterheading$_T = Writable$<Masterheading_I>
