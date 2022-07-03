import { B, be_ } from '@ctx-core/object'
import type { add_order_item_body_T, OrderItemAPIRequestQuery } from '@menus/consumer-order'
import { fetch_api_request_b } from '@menus/http'
import type { add_order_item_payload_T } from './add_order_item.js'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
import { add_order_item_request__b } from './add_order_item_request__b.js'
const key = 'add_order_item'
export const add_order_item_b:B<consumer_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const add_order_item_request_ = add_order_item_request__b(ctx)
	const fetch_api_request = fetch_api_request_b(ctx)
	return add_order_item as add_order_item_T
	async function add_order_item(data:OrderItemAPIRequestQuery, body:add_order_item_body_T) {
		return (
			await fetch_api_request(
				await add_order_item_request_(data, body)
			)
		) as add_order_item_payload_T
	}
})
export type add_order_item_T = (data:OrderItemAPIRequestQuery, body:add_order_item_body_T)=>Promise<add_order_item_payload_T>
