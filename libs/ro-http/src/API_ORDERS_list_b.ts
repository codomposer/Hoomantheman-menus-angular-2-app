import { B, be_ } from '@ctx-core/object'
import { fetch_api_request_b } from '@menus/http'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import type { API_ORDERS_list_payload_T } from './types.js'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
import { API_ORDERS_list_request__b } from './API_ORDERS_list_request__b'
const key = 'API_ORDERS_list'
export const API_ORDERS_list_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const fetch_api_request = fetch_api_request_b(ctx)
	const API_ORDERS_list_request_ = API_ORDERS_list_request__b(ctx)
	return API_ORDERS_list
	async function API_ORDERS_list(requestData:RoRequestQuery_I) {
		return await fetch_api_request(
			await API_ORDERS_list_request_(requestData)
		) as Promise<API_ORDERS_list_payload_T>
	}
})
export type API_ORDERS_list_T = (requestData:RoRequestQuery_I)=>Promise<API_ORDERS_list_payload_T>
