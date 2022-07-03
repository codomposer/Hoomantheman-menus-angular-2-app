import { B, be_ } from '@ctx-core/object'
import { API_REGISTRATION_path } from './paths.js'
import { ro_fetch_b } from './ro_fetch_b.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
import type { API_REGISTRATION_verify_email_payload_T } from './types.js'
const key = 'API_REGISTRATION_verify_email'
export const API_REGISTRATION_verify_email_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_REGISTRATION_verify_email as API_REGISTRATION_verify_email_T
	async function API_REGISTRATION_verify_email(requestData:Partial<RoRequestQuery_I>) {
		requestData.qt = 'verify_email'
		return await ro_fetch({
			apiURL: API_REGISTRATION_path,
			requestData,
			ignoreLogin: true,
		}) as Promise<API_REGISTRATION_verify_email_payload_T>
	}
})
export type API_REGISTRATION_verify_email_T = (requestData:Partial<RoRequestQuery_I>)=>Promise<API_REGISTRATION_verify_email_payload_T>
