import { Be, be_ } from '@ctx-core/object'
import { consumer_request_url__b } from '@menus/http'
import { APIRequest } from '@menus/api'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
import { GetVisibleCouponsRequestQuery } from './GetVisibleCouponsRequestQuery.js'
const key = 'fetch_get_visible_coupons_request_'
export const fetch_get_visible_coupons_request__b:Be<consumer_http_Ctx, typeof key> = be_(key, ctx=>{
	const consumer_request_url_ = consumer_request_url__b(ctx)
	return fetch_get_visible_coupons_request_ as fetch_get_visible_coupons_request__T
	async function fetch_get_visible_coupons_request_(data:GetVisibleCouponsRequestQuery) {
		const request = new APIRequest()
		request.url = await consumer_request_url_({ path: '/b/gcl.aspx', data })
		request.method = 'GET'
		return request
	}
})
export type fetch_get_visible_coupons_request__T = (data:GetVisibleCouponsRequestQuery)=>Promise<APIRequest>
