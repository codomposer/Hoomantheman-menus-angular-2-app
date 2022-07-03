import { B, be_ } from '@ctx-core/object'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
import type { API_MENUS_menuoptionitem_sort_payload_T } from './types.js'
import { API_MENUS_path } from './paths.js'
import { ro_fetch_b } from './ro_fetch_b.js'
const key = 'API_MENUS_menuoptionitem_sort'
export const API_MENUS_menuoptionitem_sort_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_MENUS_menuoptionitem_sort as API_MENUS_menuoptionitem_sort_T
	async function API_MENUS_menuoptionitem_sort(
		requestData:Partial<RoRequestQuery_I>, body:API_MENUS_menuoptionitem_sort_body_T
	) {
		requestData.qt = 'menuoptionitem'
		requestData.act = 'sort'
		return await ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
			requestMethod: 'POST',
			body: JSON.stringify(body),
		}) as Promise<API_MENUS_menuoptionitem_sort_payload_T>
	}
})
export type API_MENUS_menuoptionitem_sort_T = (
	requestData:Partial<RoRequestQuery_I>, body:API_MENUS_menuoptionitem_sort_body_T
)=>Promise<API_MENUS_menuoptionitem_sort_payload_T>
export interface API_MENUS_menuoptionitem_sort_body_T {
	SortDetails:{ ID:string, SortID:string }[]
}
