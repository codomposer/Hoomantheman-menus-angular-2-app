import { B, be_ } from '@ctx-core/object'
import { ro_http_Ctx } from './ro_http_Ctx.js'
import { API_LIST_cuisine_payload_T } from './types.js'
import { RoRequestQuery_I } from './RoRequestQuery_I.js'
import { ro_fetch_b } from './ro_fetch_b.js'
import { API_LIST_path } from './paths.js'
const key = 'API_LIST_cuisine'
export const API_LIST_cuisine_b:B<ro_http_Ctx, typeof key> = be_(key, ctx=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_LIST_cuisine as API_LIST_cuisine_T
	async function API_LIST_cuisine(requestData:Partial<RoRequestQuery_I>) {
		requestData.qt = 'cuisine'
		return await ro_fetch({
			apiURL: API_LIST_path,
			requestData
		}) as Promise<API_LIST_cuisine_payload_T>
	}
})
export type API_LIST_cuisine_T = (requestData:Partial<RoRequestQuery_I>)=>Promise<API_LIST_cuisine_payload_T>
