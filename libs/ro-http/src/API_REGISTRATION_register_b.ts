import { B, be_ } from '@ctx-core/object'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
import { API_REGISTRATION_path } from './paths.js'
import { ro_fetch_b } from './ro_fetch_b.js'
import type { API_REGISTRATION_register_payload_T } from './types.js'
const key = 'API_REGISTRATION_register'
export const API_REGISTRATION_register_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_REGISTRATION_register as API_REGISTRATION_register_T
	async function API_REGISTRATION_register(requestData:Partial<RoRequestQuery_I>) {
		requestData.qt = 'register'
		return await ro_fetch({
			apiURL: API_REGISTRATION_path,
			requestData,
			ignoreLogin: true,
		}) as Promise<API_REGISTRATION_register_payload_T>
	}
})
export type API_REGISTRATION_register_T = (requestData:Partial<RoRequestQuery_I>)=>Promise<API_REGISTRATION_register_payload_T>
