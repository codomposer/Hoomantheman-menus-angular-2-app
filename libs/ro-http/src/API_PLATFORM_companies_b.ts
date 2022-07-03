import { B, be_ } from '@ctx-core/object'
import { API_PLATFORM_path } from './paths.js'
import { ro_fetch_b } from './ro_fetch_b.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import type { RoRequestQuery } from './RoRequestQuery.js'
import type { API_PLATFORM_companies_payload_T } from './types.js'
const key = 'API_PLATFORM_companies'
export const API_PLATFORM_companies_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_PLATFORM_companies as API_PLATFORM_companies_T
	async function API_PLATFORM_companies(requestData:Partial<RoRequestQuery>) {
		requestData.qt = 'companies'
		return await ro_fetch({
			apiURL: API_PLATFORM_path,
			requestData,
		}) as Promise<API_PLATFORM_companies_payload_T>
	}
})
export type API_PLATFORM_companies_T = (requestData:Partial<RoRequestQuery>)=>
	Promise<API_PLATFORM_companies_payload_T>
