import { B, be_ } from '@ctx-core/object'
import { OrderAPIRequestQuery } from '@menus/consumer-order'
import { fetch_api_request_b } from '@menus/http'
import type { add_order_body_T, add_order_payload_T } from './add_order.js'
import { add_order_request__b } from './add_order_request__b.js'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
const key = 'add_order'
export const add_order_b:B<consumer_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const fetch_api_request = fetch_api_request_b(ctx)
	const add_order_request_ = add_order_request__b(ctx)
	return add_order as add_order_T
	async function add_order(data:OrderAPIRequestQuery, body:add_order_body_T) {
		return (
			await fetch_api_request(
				await add_order_request_(data, body)
			)
		) as add_order_payload_T
	}
})
export type add_order_T = (data:OrderAPIRequestQuery, body:add_order_body_T)=>Promise<add_order_payload_T>
