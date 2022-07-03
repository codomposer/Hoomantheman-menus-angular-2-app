import { B, be_ } from '@ctx-core/object'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import { API_ORDERS_path } from './paths.js'
import { API_ORDERS_detail_payload_T } from './types.js'
import { RoRequestQuery_I } from './RoRequestQuery_I.js'
import { ro_fetch_b } from './ro_fetch_b.js'
const key = 'API_ORDERS_detail'
export const API_ORDERS_detail_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_ORDERS_detail as API_ORDERS_detail_T
	async function API_ORDERS_detail(requestData) {
		requestData.qt = 'detail'
		return await ro_fetch({
			apiURL: API_ORDERS_path,
			requestData,
		}) as Promise<API_ORDERS_detail_payload_T>
	}
})
export type API_ORDERS_detail_T = (requestData:RoRequestQuery_I)=>Promise<API_ORDERS_detail_payload_T>
