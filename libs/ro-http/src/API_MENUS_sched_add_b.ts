import { B, be_ } from '@ctx-core/object'
import { Schedule } from '@menus/ro-shared-models'
import { API_MENUS_path } from './paths.js'
import { API_MENUS_sched_add_payload_T } from './types.js'
import { ro_fetch_b } from './ro_fetch_b.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
const key = 'API_MENUS_sched_add'
export const API_MENUS_sched_add_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	return async function API_MENUS_sched_add(requestData, body:Schedule) {
		requestData.qt = 'sched'
		requestData.act = 'add'
		return await ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
			requestMethod: 'POST',
			body: JSON.stringify(body),
		}) as Promise<API_MENUS_sched_add_payload_T>
	}
})
export type API_MENUS_sched_add_T = (requestData:Partial<RoRequestQuery_I>, body:Schedule)=>
	Promise<API_MENUS_sched_add_payload_T>
