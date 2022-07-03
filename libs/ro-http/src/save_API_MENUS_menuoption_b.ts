import { B, be_ } from '@ctx-core/object'
import { RoMenuitem_I, RoMenuoption_I } from '@menus/ro-shared-models'
import { is_new_o_ } from '@menus/util'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import type { save_API_MENUS_menuoption_payload_T } from './types.js'
import { API_MENUS_menuoption_add_b } from './API_MENUS_menuoption_add_b.js'
import { API_MENUS_menuoption_update_b } from './API_MENUS_menuoption_update_b.js'
import { MenuoptionAPIRequestQuery } from './MenuoptionAPIRequestQuery.js'
const key = 'save_API_MENUS_menuoption'
export const save_API_MENUS_menuoption_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const API_MENUS_menuoption_add = API_MENUS_menuoption_add_b(ctx)
	const API_MENUS_menuoption_update = API_MENUS_menuoption_update_b(ctx)
	return async function save_API_MENUS_menuoption(requestData:MenuoptionAPIRequestQuery, menuoption:RoMenuoption_I, menuitem:RoMenuitem_I) {
		if (is_new_o_(menuoption)) {
			MenuoptionAPIRequestQuery.fill_menuitemID(requestData, menuitem.ID)
			return API_MENUS_menuoption_add(requestData)
		} else {
			MenuoptionAPIRequestQuery.fill_ID(requestData, menuoption.ID)
			return API_MENUS_menuoption_update(requestData)
		}
	}
})
export type save_API_MENUS_menuoption_T = (requestData:MenuoptionAPIRequestQuery, menuoption:RoMenuoption_I, menuitem:RoMenuitem_I)=>
	Promise<save_API_MENUS_menuoption_payload_T>
