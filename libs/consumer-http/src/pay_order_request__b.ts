import { B, be_ } from '@ctx-core/object'
import { query_str_ } from '@ctx-core/uri'
import { APIRequest } from '@menus/api'
import { OrderAPIRequestQuery_I } from '@menus/consumer-order'
import { consumer_request_url__b } from '@menus/http'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
const key = 'pay_order_request_'
export const pay_order_request__b:B<consumer_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const consumer_request_url_ = consumer_request_url__b(ctx)
	return pay_order_request_ as pay_order_request__T
	async function pay_order_request_(body:Partial<OrderAPIRequestQuery_I>) {
		const request = new APIRequest()
		request.url = await consumer_request_url_({ path: '/b/pn.aspx' })
		request.method = 'POST'
		request.body = query_str_(body, '')
		request.headers = {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/x-www-form-urlencoded',
		}
		return request
	}
})
export type pay_order_request__T = (body:Partial<OrderAPIRequestQuery_I>)=>Promise<APIRequest>
