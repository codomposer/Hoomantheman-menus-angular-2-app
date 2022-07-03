import { B, be_ } from '@ctx-core/object'
import { ro_http_Ctx } from './ro_http_Ctx.js'
import { API_RESTAURANT_accept_terms_body_T, API_RESTAURANT_accept_terms_payload_T } from './types.js'
import { RoRequestQuery_I } from './RoRequestQuery_I.js'
import { ro_fetch_b } from './ro_fetch_b.js'
import { API_RESTAURANT_path } from './paths.js'
const key = 'API_RESTAURANT_accept_terms'
export const API_RESTAURANT_accept_terms_b:B<ro_http_Ctx, typeof key> = be_(key, ctx=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_RESTAURANT_accept_terms as API_RESTAURANT_accept_terms_T
	async function API_RESTAURANT_accept_terms(requestData:Partial<RoRequestQuery_I>, body:API_RESTAURANT_accept_terms_body_T) {
		requestData.qt = 'accept_terms'
		return await ro_fetch({
			apiURL: API_RESTAURANT_path,
			requestMethod: 'POST',
			requestData,
			body: JSON.stringify(body),
		}) as Promise<API_RESTAURANT_accept_terms_payload_T>
	}
})
export type API_RESTAURANT_accept_terms_T =
	(requestData:Partial<RoRequestQuery_I>, body:API_RESTAURANT_accept_terms_body_T)=>
		Promise<API_RESTAURANT_accept_terms_payload_T>
