import { B, be_ } from '@ctx-core/object'
import { API_REGISTRATION_path } from './paths.js'
import type { API_REGISTRATION_search_payload_T } from './types.js'
import { ro_fetch_b, SendRequestOptions } from './ro_fetch_b.js'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
const key = 'fetch_API_REGISTRATION_search'
export const fetch_API_REGISTRATION_search_b:B<ro_http_Ctx, typeof key> = be_(key, ctx=>{
	const ro_fetch = ro_fetch_b(ctx)
	return fetch_API_REGISTRATION_search as fetch_API_REGISTRATION_search_T
	async function fetch_API_REGISTRATION_search(requestData:Partial<RoRequestQuery_I>) {
		requestData.qt = 'search'
		return await ro_fetch({
			apiURL: API_REGISTRATION_path,
			requestData,
			ignoreLogin: true,
		} as SendRequestOptions) as fetch_API_REGISTRATION_search_ret_T
	}
})
export type fetch_API_REGISTRATION_search_T =
	(requestData:RoRequestQuery_I)=>
		Promise<fetch_API_REGISTRATION_search_ret_T>
export type fetch_API_REGISTRATION_search_ret_T =
	API_REGISTRATION_search_payload_T|fetch_API_REGISTRATION_search_error_T
export interface fetch_API_REGISTRATION_search_error_T {
	Status:'error'
	Code:'ERR_NO_DATA'|string
	Message:string
}
