import { B, be_ } from '@ctx-core/object'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import type { API_GLOBAL_get_payload_T } from './types.js'
import { API_GLOBAL_path } from './paths.js'
import { ro_fetch_b } from './ro_fetch_b.js'
const key = 'API_GLOBAL_get'
export const API_GLOBAL_get_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_GLOBAL_get as API_GLOBAL_get_T
	async function API_GLOBAL_get() {
		return await ro_fetch({
			apiURL: API_GLOBAL_path,
			ignoreLogin: true,
			cache: true
		}) as API_GLOBAL_get_payload_T
	}
})
export type API_GLOBAL_get_T = ()=>Promise<API_GLOBAL_get_payload_T>
