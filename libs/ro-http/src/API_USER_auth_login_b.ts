import { B, be_ } from '@ctx-core/object'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import type { RoLoginAPIRequestQuery } from './RoLoginAPIRequestQuery.js'
import { API_USER_path } from './paths.js'
import type { API_USER_auth_login_payload_T } from './types.js'
import { ro_fetch_b } from './ro_fetch_b.js'
const key = 'API_USER_auth_login'
export const API_USER_auth_login_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_USER_auth_login as API_USER_auth_login_T
	async function API_USER_auth_login(requestData:RoLoginAPIRequestQuery) {
		requestData.qt = 'auth_login'
		return await ro_fetch({
			apiURL: API_USER_path,
			requestData,
			ignoreLogin: true
		}) as Promise<API_USER_auth_login_payload_T>
	}
})
export type API_USER_auth_login_T = (requestData:RoLoginAPIRequestQuery)=>Promise<API_USER_auth_login_payload_T>
