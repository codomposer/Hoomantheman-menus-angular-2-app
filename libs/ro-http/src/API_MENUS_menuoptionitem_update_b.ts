import { B, be_ } from '@ctx-core/object'
import { ro_http_Ctx } from './ro_http_Ctx'
import { RoMenuoptionitem } from '@menus/ro-shared-models'
import type { API_MENUS_menuoptionitem_update_payload_T } from './types.js'
import type { MenuoptionitemAPIRequestQuery } from './MenuoptionitemAPIRequestQuery.js'
import { API_MENUS_path } from './paths.js'
import { ro_fetch_b } from './ro_fetch_b.js'
const key = 'API_MENUS_menuoptionitem_update'
export const API_MENUS_menuoptionitem_update_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	// Update Menu Option
	return async function API_MENUS_menuoptionitem_update(
		requestData:MenuoptionitemAPIRequestQuery, menuoptionitem:RoMenuoptionitem
	) {
		requestData.qt = 'menuoptionitem'
		requestData.act = 'update'
		const body = {
			SizeDetails: menuoptionitem.SizeDetails
		}
		return ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
			requestMethod: 'POST',
			body: JSON.stringify(body),
		}) as Promise<API_MENUS_menuoptionitem_update_payload_T>
	}
})
export type API_MENUS_menuoptionitem_update_T = (
	requestData:MenuoptionitemAPIRequestQuery, menuoptionitem:RoMenuoptionitem
)=>Promise<API_MENUS_menuoptionitem_update_payload_T>
