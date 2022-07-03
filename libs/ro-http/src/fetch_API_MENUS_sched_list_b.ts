import { B, be_ } from '@ctx-core/object'
import { API_MENUS_path } from './paths.js'
import type { fetch_API_MENUS_sched_list_payload_T } from './types.js'
import { ro_fetch_b } from './ro_fetch_b.js'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
const key = 'fetch_API_MENUS_sched_list'
export const fetch_API_MENUS_sched_list_b:B<ro_http_Ctx, typeof key> = be_(key, ctx=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_MENUS_sched_list as fetch_API_MENUS_sched_list_T
	async function API_MENUS_sched_list(requestData:Partial<RoRequestQuery_I>) {
		requestData.qt = 'sched'
		requestData.act = 'list'
		return await ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
		}) as Promise<fetch_API_MENUS_sched_list_payload_T>
	}
})
export type fetch_API_MENUS_sched_list_T =
	(requestData:Partial<RoRequestQuery_I>)=>
		Promise<fetch_API_MENUS_sched_list_payload_T>
