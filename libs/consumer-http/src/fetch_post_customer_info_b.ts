import { B, be_ } from '@ctx-core/object'
import { fetch_api_request_b } from '@menus/http'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
import {
	fetch_post_customer_info_data_T, fetch_post_customer_info_request__b
} from './fetch_post_customer_info_request__b.js'
const key = 'fetch_post_customer_info'
export const fetch_post_customer_info_b:B<consumer_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const fetch_api_request = fetch_api_request_b(ctx)
	const fetch_post_customer_info_request_ = fetch_post_customer_info_request__b(ctx)
	return fetch_post_customer_info as fetch_post_customer_info_T
	async function fetch_post_customer_info(data:fetch_post_customer_info_data_T) {
		return (
			await fetch_api_request(
				await fetch_post_customer_info_request_(data)
			)
		)
	}
})
export type fetch_post_customer_info_T = (data:fetch_post_customer_info_data_T)=>
	Promise<fetch_post_customer_info_payload_T>
export interface fetch_post_customer_info_payload_T {}
