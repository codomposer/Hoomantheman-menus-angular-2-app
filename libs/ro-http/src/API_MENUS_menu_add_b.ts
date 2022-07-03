import { B, be_ } from '@ctx-core/object'
import { API_MENUS_path } from './paths.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import { ro_fetch_b } from './ro_fetch_b.js'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
import type { API_MENUS_menu_add_payload_T } from './types.js'
const key = 'API_MENUS_menu_add'
export const API_MENUS_menu_add_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_MENUS_menu_add as API_MENUS_menu_add_T
	async function API_MENUS_menu_add(requestData:Partial<RoRequestQuery_I>) {
		requestData.qt = 'menu'
		requestData.act = 'add'
		return await ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
		}) as Promise<API_MENUS_menu_add_payload_T>
	}
})
export type API_MENUS_menu_add_T = (requestData:Partial<RoRequestQuery_I>)=>Promise<API_MENUS_menu_add_payload_T>
