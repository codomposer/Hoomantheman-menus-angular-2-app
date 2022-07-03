import { B, be_ } from '@ctx-core/object'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
import { API_SAVE_INFO_path } from './paths.js'
import { ro_fetch_b } from './ro_fetch_b.js'
const key = 'API_SAVE_INFO'
export const API_SAVE_INFO_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_SAVE_INFO as API_SAVE_INFO_T
	async function API_SAVE_INFO(requestData:Partial<RoRequestQuery_I>, body:API_SAVE_INFO_body_T) {
		return await ro_fetch({
			apiURL: API_SAVE_INFO_path,
			requestData,
			requestMethod: 'POST',
			body: JSON.stringify(body),
		}) as Promise<API_SAVE_INFO_payload_T>
	}
})
export type API_SAVE_INFO_T = (requestData:Partial<RoRequestQuery_I>, body:API_SAVE_INFO_body_T)=>
	Promise<API_SAVE_INFO_payload_T>
export interface API_SAVE_INFO_body_T {}
export interface API_SAVE_INFO_payload_T {}
