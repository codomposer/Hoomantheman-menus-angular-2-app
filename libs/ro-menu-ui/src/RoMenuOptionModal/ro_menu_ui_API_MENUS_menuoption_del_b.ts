import { B, be_ } from '@ctx-core/object'
import { params_fireFlyID$_b } from '@menus/page'
import { RoMenuoptionitem_I } from '@menus/ro-shared-models'
import { API_MENUS_menuoption_del_b, RoRequestQuery } from '@menus/ro-http'
import { confirmModal$_b } from '@menus/shared-ui'
import { STATUS_SUCCESS } from '@menus/web-config'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { ro_menuoptions$_b } from '../ro_menuoptions$_b.js'
import { RoMenuOptionModal_busy$_b } from './RoMenuOptionModal_busy$_b.js'
const key = 'ro_menu_ui_API_MENUS_menuoption_del'
export const ro_menu_ui_API_MENUS_menuoption_del_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, (ctx)=>{
	const API_MENUS_menuoption_del = API_MENUS_menuoption_del_b(ctx)
	const confirmModal$ = confirmModal$_b(ctx)
	const RoMenuOptionModal_busy$ = RoMenuOptionModal_busy$_b(ctx)
	const params_fireFlyID$ = params_fireFlyID$_b(ctx)
	const ro_menuoptions$ = ro_menuoptions$_b(ctx)
	return ro_menu_ui_API_MENUS_menuoption_del as ro_menu_ui_API_MENUS_menuoption_del_T
	async function ro_menu_ui_API_MENUS_menuoption_del(
		menuoption_index:number, menuoption:RoMenuoptionitem_I
	):Promise<void> {
		const confirm = await confirmModal$.$.open({
			message: `Are you sure you want to delete ${menuoption.Name}?`,
		})
		if (confirm) {
			RoMenuOptionModal_busy$.$ = true
			try {
				const requestData = new RoRequestQuery()
				RoRequestQuery.fill_fireFlyID(requestData, params_fireFlyID$.$)
				RoRequestQuery.fill_ID(requestData, menuoption.ID)
				const payload = await API_MENUS_menuoption_del(requestData)
				if (payload.Status === STATUS_SUCCESS) {
					ro_menuoptions$.update(ro_menuoptions=>{
						ro_menuoptions.splice(menuoption_index, 1)
						return ro_menuoptions
					})
				}
			} finally {
				RoMenuOptionModal_busy$.$ = false
			}
		}
	}
})
export type ro_menu_ui_API_MENUS_menuoption_del_T = (menuoption_index:number, menuoption:RoMenuoptionitem_I)=>
	Promise<void>
