import { B, be_ } from '@ctx-core/object'
import { ro_http_Ctx } from './ro_http_Ctx.js'
import { API_ORDERS_path } from './paths.js'
import { API_ORDERS_route_payload_T } from './types.js'
import { RoRequestQuery_I } from './RoRequestQuery_I.js'
import { ro_fetch_b } from './ro_fetch_b.js'
const key = 'API_ORDERS_route'
export const API_ORDERS_route_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_ORDERS_route as API_ORDERS_route_T
	async function API_ORDERS_route(requestData:RoRequestQuery_I) {
		requestData.qt = 'route'
		return await ro_fetch({
			apiURL: API_ORDERS_path,
			requestData,
		}) as Promise<API_ORDERS_route_payload_T>
	}
})
export type API_ORDERS_route_T = (requestData:RoRequestQuery_I)=>Promise<API_ORDERS_route_payload_T>
