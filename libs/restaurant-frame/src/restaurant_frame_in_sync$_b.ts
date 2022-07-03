import { B, be_ } from '@ctx-core/object'
import { tup } from '@ctx-core/array'
import { derived$, Readable$ } from '@ctx-core/store'
import { serviceType$_b } from '@menus/service-type'
import { userAddress$_b } from '@menus/consumer-user-address'
import { params_fireFlyID$_b } from '@menus/page'
import { restaurant_frame$_b, RestaurantFrame_I } from './restaurant_frame$_b.js'
import { restaurant_frame_in_sync_, restaurant_frame_in_sync_warn_ } from './restaurant_frame_in_sync_.js'
import type { restaurant_frame_Ctx } from './restaurant_frame_Ctx.js'
const key = 'restaurant_frame_in_sync$'
export const restaurant_frame_in_sync$_b:B<restaurant_frame_Ctx, typeof key> = be_(key, ctx=>{
	const restaurant_frame$ = restaurant_frame$_b(ctx)
	const params_fireFlyID$ = params_fireFlyID$_b(ctx)
	const userAddress$ = userAddress$_b(ctx)
	const serviceType$ = serviceType$_b(ctx)
	return derived$(tup(restaurant_frame$, params_fireFlyID$, userAddress$, serviceType$),
		([
			 restaurant_frame,
			 params_fireFlyID,
			 userAddress,
			 serviceType
		 ])=>{
			const source_syncable = {
				fireFlyID: params_fireFlyID,
				userAddress,
				serviceType,
			}
			const $restaurant_frame_in_sync =
				restaurant_frame_in_sync_(restaurant_frame as RestaurantFrame_I, source_syncable)
			if (!$restaurant_frame_in_sync) {
				restaurant_frame_in_sync_warn_(restaurant_frame as RestaurantFrame_I, source_syncable)
			}
			return $restaurant_frame_in_sync
		})
})
export type restaurant_frame_in_sync$_T = Readable$<boolean>
