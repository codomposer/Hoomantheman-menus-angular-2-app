import { B, be_ } from '@ctx-core/object'
import { APIRequest } from '@menus/api'
import { consumer_request_url__b } from '@menus/http'
import type { add_order_item_body_T, OrderItemAPIRequestQuery } from '@menus/consumer-order'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
const key = 'add_order_item_request_'
export const add_order_item_request__b:B<consumer_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const consumer_request_url_ = consumer_request_url__b(ctx)
	return add_order_item_request_ as add_order_item_request__T
	async function add_order_item_request_(data:OrderItemAPIRequestQuery, body:add_order_item_body_T) {
		const request = new APIRequest()
		request.url = await consumer_request_url_({ path: '/b/n.aspx', data })
		request.body = JSON.stringify(body)
		request.method = 'POST'
		return request
	}
})
export type add_order_item_request__T = (data:OrderItemAPIRequestQuery, body:add_order_item_body_T)=>Promise<APIRequest>
