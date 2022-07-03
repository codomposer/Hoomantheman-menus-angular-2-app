import { B, be_ } from '@ctx-core/object'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import type { API_GLOBAL_lookupstate_payload_T } from './types.js'
import { API_GLOBAL_path } from './paths.js'
import { ro_fetch_b } from './ro_fetch_b.js'
import { RoRequestQuery } from './RoRequestQuery.js'
const key = 'API_GLOBAL_lookupstate'
export const API_GLOBAL_lookupstate_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_GLOBAL_lookupstate as API_GLOBAL_lookupstate_T
	async function API_GLOBAL_lookupstate() {
		const requestData = new RoRequestQuery()
		requestData.qt = 'lookupstate'
		return await ro_fetch({
			apiURL: API_GLOBAL_path,
			requestData,
			ignoreLogin: true,
			cache: true
		}) as API_GLOBAL_lookupstate_payload_T
	}
})
export type API_GLOBAL_lookupstate_T = ()=>Promise<API_GLOBAL_lookupstate_payload_T>
