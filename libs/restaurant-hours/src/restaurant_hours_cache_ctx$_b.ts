import { B, be_ } from '@ctx-core/object'
import { hour_milliseconds } from '@ctx-core/time'
import { cache_ctx$_, cache_ctx$_T, cache_ctx_value$_T } from '@ctx-core/cache'
import { GetRestaurantHoursRequestQuery, RestaurantHours_I } from '@menus/restaurant-hours-lib'
import { fetch_get_restaurant_hours_b } from '@menus/shared-http'
import type { restaurant_hours_Ctx } from './restaurant_hours_Ctx.js'
const key = 'restaurant_hours_cache_ctx$'
export const restaurant_hours_cache_ctx$_b:B<restaurant_hours_Ctx, typeof key> = be_(key, ctx=>{
	const fetch_get_restaurant_hours = fetch_get_restaurant_hours_b(ctx)
	const restaurant_hours_cache_ctx$:restaurant_hours_cache_ctx$_T = cache_ctx$_(
		async (fireFlyID:string)=>{
			const requestData = new GetRestaurantHoursRequestQuery()
			requestData.ff = fireFlyID
			const restaurant_hours_payload = await fetch_get_restaurant_hours(requestData)
			return restaurant_hours_payload as RestaurantHours_I
		}, {
			period: hour_milliseconds,
			poll: true,
		}
	)
	return restaurant_hours_cache_ctx$
})
export type restaurant_hours_cache_ctx_value$_T = cache_ctx_value$_T<RestaurantHours_I>
export type restaurant_hours_cache_ctx$_T = cache_ctx$_T<RestaurantHours_I>
