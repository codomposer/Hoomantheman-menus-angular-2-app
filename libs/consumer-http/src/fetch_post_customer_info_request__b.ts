import { B, be_ } from '@ctx-core/object'
import { APIRequest } from '@menus/api'
import { consumer_request_url__b } from '@menus/http'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
const key = 'fetch_post_customer_info_request_'
export const fetch_post_customer_info_request__b:B<consumer_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const consumer_request_url_ = consumer_request_url__b(ctx)
	return fetch_post_customer_info_request_ as fetch_post_customer_info_request__T
	async function fetch_post_customer_info_request_(data:fetch_post_customer_info_data_T):Promise<any> {
		const request = new APIRequest()
		request.url = await consumer_request_url_({ path: '/b/cs_si.aspx' })
		request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		const body_data = Object.fromEntries(Object.entries(data).map(([k, v])=>
			[k, v.toString()]
		))
		request.body = new URLSearchParams(body_data)
		request.method = 'POST'
		return request
	}
})
export type fetch_post_customer_info_request__T = (data:fetch_post_customer_info_data_T)=>Promise<APIRequest>
export interface fetch_post_customer_info_data_T {
	a:number
	x:string
	i:number
}
