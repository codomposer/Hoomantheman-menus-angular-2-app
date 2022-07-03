import { B, be_ } from '@ctx-core/object'
import { APIRequest } from '@menus/api'
import { shared_request_url__b } from '@menus/http'
import { GetRestaurantHoursRequestQuery } from '@menus/restaurant-hours-lib'
import type { shared_http_Ctx } from './shared_http_Ctx.js'
const key = 'fetch_get_restaurant_hours_request_'
export const fetch_get_restaurant_hours_request__b:B<shared_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const shared_request_url_ = shared_request_url__b(ctx)
	return fetch_get_restaurant_hours_request_ as fetch_get_restaurant_hours_request__T
	async function fetch_get_restaurant_hours_request_(data:Partial<GetRestaurantHoursRequestQuery>) {
		const request = new APIRequest()
		request.url = shared_request_url_({ path: '/b/grh.aspx', data })
		request.method = 'GET'
		return request
	}
})
export type fetch_get_restaurant_hours_request__T = (data:Partial<GetRestaurantHoursRequestQuery>)=>Promise<APIRequest>
