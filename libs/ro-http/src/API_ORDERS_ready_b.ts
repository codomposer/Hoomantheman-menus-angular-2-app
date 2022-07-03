import { B, be_ } from '@ctx-core/object'
import { ro_login_user$_b } from '@menus/ro-user-common'
import { ro_http_Ctx } from './ro_http_Ctx.js'
import { RoRequestQuery } from './RoRequestQuery.js'
import { API_ORDERS_path } from './paths.js'
import { API_ORDERS_accept_payload_T } from './types.js'
import { RoRequestQuery_I } from './RoRequestQuery_I.js'
import { ro_fetch_b } from './ro_fetch_b.js'
const key = 'API_ORDERS_ready'
export const API_ORDERS_ready_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_login_user$ = ro_login_user$_b(ctx)
	const ro_fetch = ro_fetch_b(ctx)
	return API_ORDERS_ready as API_ORDERS_ready_T
	async function API_ORDERS_ready(requestData:RoRequestQuery_I) {
		RoRequestQuery.fill_login_user(requestData, ro_login_user$.$)
		requestData.qt = 'ready'
		return await ro_fetch({
			apiURL: API_ORDERS_path,
			requestData,
		}) as Promise<API_ORDERS_accept_payload_T>
	}
})
export type API_ORDERS_ready_T = (requestData:RoRequestQuery_I)=>Promise<API_ORDERS_accept_payload_T>
