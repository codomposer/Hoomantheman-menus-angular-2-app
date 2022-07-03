import { B, be_ } from '@ctx-core/object'
import type { OrderAPIRequestQuery_I } from '@menus/consumer-order'
import { fetch_api_request_b } from '@menus/http'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
import type { pay_order_payload_T } from './pay_order.js'
import { pay_order_request__b } from './pay_order_request__b.js'
const key = 'pay_order'
export const pay_order_b:B<consumer_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const fetch_api_request = fetch_api_request_b(ctx)
	const pay_order_request_ = pay_order_request__b(ctx)
	return pay_order as pay_order_T
	async function pay_order(body:Partial<OrderAPIRequestQuery_I>) {
		return (
			await fetch_api_request(
				await pay_order_request_(body)
			)
		) as pay_order_payload_T
	}
})
export type pay_order_T = (body:Partial<OrderAPIRequestQuery_I>)=>Promise<pay_order_payload_T>
