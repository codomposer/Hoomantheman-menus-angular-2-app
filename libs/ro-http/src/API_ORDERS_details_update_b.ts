import { B, be_ } from '@ctx-core/object'
import { ro_http_Ctx } from './ro_http_Ctx.js'
import { API_ORDERS_path } from './paths.js'
import { API_ORDERS_details_update_payload_T } from './types.js'
import { RoRequestQuery_I } from './RoRequestQuery_I.js'
import { ro_fetch_b } from './ro_fetch_b.js'
const key = 'API_ORDERS_details_update'
export const API_ORDERS_details_update_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_ORDERS_details_update as API_ORDERS_details_update_T
	async function API_ORDERS_details_update(requestData:RoRequestQuery_I, body:any) {
		requestData.qt = 'details_update'
		return await ro_fetch({
			apiURL: API_ORDERS_path,
			requestData,
			requestMethod: 'POST',
			body: JSON.stringify(body),
		}) as Promise<API_ORDERS_details_update_payload_T>
	}
})
export type API_ORDERS_details_update_T =
	(requestData:RoRequestQuery_I, body:any)=>Promise<API_ORDERS_details_update_payload_T>
