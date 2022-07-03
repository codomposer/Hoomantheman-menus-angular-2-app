import { B, be_ } from '@ctx-core/object'
import { RoMenuoptionitem_I } from '@menus/ro-shared-models'
import { is_new_o_ } from '@menus/util'
import type { MenuoptionitemAPIRequestQuery } from './MenuoptionitemAPIRequestQuery.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import { API_MENUS_menuoptionitem_add_b } from './API_MENUS_menuoptionitem_add_b.js'
import { API_MENUS_menuoptionitem_update_b } from './API_MENUS_menuoptionitem_update_b.js'
import type {
	API_MENUS_menuoptionitem_add_payload_T, API_MENUS_menuoptionitem_update_payload_T,
	save_API_MENUS_menuoptionitem_payload_T
} from './types.js'
import { RoRequestQuery } from './RoRequestQuery.js'
const key = 'save_API_MENUS_menuoptionitem'
export const save_API_MENUS_menuoptionitem_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const API_MENUS_menuoptionitem_add = API_MENUS_menuoptionitem_add_b(ctx)
	const API_MENUS_menuoptionitem_update = API_MENUS_menuoptionitem_update_b(ctx)
	return async function save_API_MENUS_menuoptionitem(
		requestData:MenuoptionitemAPIRequestQuery, menuoptionitem:RoMenuoptionitem_I
	) {
		let payload:API_MENUS_menuoptionitem_add_payload_T|API_MENUS_menuoptionitem_update_payload_T
		if (is_new_o_(menuoptionitem)) {
			payload = await API_MENUS_menuoptionitem_add(requestData, menuoptionitem)
		} else {
			RoRequestQuery.fill_ID(requestData, menuoptionitem.ID)
			payload = await API_MENUS_menuoptionitem_update(requestData, menuoptionitem)
		}
		return payload as save_API_MENUS_menuoptionitem_payload_T
	}
})
export type save_API_MENUS_menuoptionitem_T = (
	requestData:MenuoptionitemAPIRequestQuery, menuoptionitem:RoMenuoptionitem_I
)=>Promise<save_API_MENUS_menuoptionitem_payload_T>
