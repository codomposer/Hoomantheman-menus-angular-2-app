import { B, be_ } from '@ctx-core/object'
import { API_REGISTRATION_path } from './paths.js'
import type { API_REGISTRATION_new_payload_T } from './types.js'
import { ro_fetch_b } from './ro_fetch_b.js'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
const key = 'fetch_API_REGISTRATION_new'
export const fetch_API_REGISTRATION_new_b:B<ro_http_Ctx, typeof key> = be_(key, ctx=>{
	const ro_fetch = ro_fetch_b(ctx)
	return fetch_API_REGISTRATION_new
	async function fetch_API_REGISTRATION_new(requestData:Partial<RoRequestQuery_I>) {
		requestData.qt = 'new'
		return await ro_fetch({
			apiURL: API_REGISTRATION_path,
			requestData,
			ignoreLogin: true,
		}) as Promise<API_REGISTRATION_new_payload_T>
	}
})
export type fetch_API_REGISTRATION_new_T =
	(requestData:Partial<RoRequestQuery_I>)=>
		Promise<API_REGISTRATION_new_payload_T>
