import { B, be_ } from '@ctx-core/object'
import { fetch_api_request_b } from '@menus/http'
import { GetRestaurantHoursRequestQuery, RestaurantHours_I } from '@menus/restaurant-hours-lib'
import { fetch_get_restaurant_hours_request__b } from './fetch_get_restaurant_hours_request__b.js'
import type { shared_http_Ctx } from './shared_http_Ctx.js'
const key = 'fetch_get_restaurant_hours'
export const fetch_get_restaurant_hours_b:B<shared_http_Ctx, typeof key> = be_(key, ctx=>{
	const fetch_get_restaurant_hours_request_ = fetch_get_restaurant_hours_request__b(ctx)
	const fetch_api_request = fetch_api_request_b(ctx)
	return fetch_get_restaurant_hours as fetch_get_restaurant_hours_T
	async function fetch_get_restaurant_hours(data:Partial<GetRestaurantHoursRequestQuery>) {
		const request = await fetch_get_restaurant_hours_request_(data)
		return await fetch_api_request(request) as get_restaurant_hours_payload_T
	}
})
export type fetch_get_restaurant_hours_T = (data:Partial<GetRestaurantHoursRequestQuery>)=>
	Promise<get_restaurant_hours_payload_T>
export type get_restaurant_hours_payload_T = RestaurantHours_I
