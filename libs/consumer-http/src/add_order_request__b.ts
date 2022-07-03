import { B, be_ } from '@ctx-core/object'
import { APIRequest } from '@menus/api'
import type { OrderAPIRequestQuery } from '@menus/consumer-order'
import { consumer_request_url__b } from '@menus/http'
import type { add_order_body_T } from './add_order.js'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
const key = 'add_order_request_'
export const add_order_request__b:B<consumer_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const consumer_request_url_ = consumer_request_url__b(ctx)
	return add_order_request_ as add_order_request__T
	async function add_order_request_(data:OrderAPIRequestQuery, body:add_order_body_T) {
		const request = new APIRequest()
		request.url = await consumer_request_url_({ path: '/b/r.aspx', data })
		request.method = 'POST'
		request.body = JSON.stringify(body)
		return request
	}
})
export type add_order_request__T = (data:OrderAPIRequestQuery, body:add_order_body_T)=>Promise<APIRequest>
