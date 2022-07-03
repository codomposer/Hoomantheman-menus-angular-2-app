import { assign, B, be_ } from '@ctx-core/object'
import type { RoMenuoption_I, RoMenuoption_ui_I } from '@menus/ro-shared-models'
import {
	MenuoptionAPIRequestQuery, save_API_MENUS_menuoption_b, save_API_MENUS_menuoption_payload_T,
} from '@menus/ro-http'
import { is_new_o_ } from '@menus/util'
import { STATUS_SUCCESS } from '@menus/web-config'
import { params_fireFlyID$_b } from '@menus/page'
import { notyf_success_b } from '@menus/notyf'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
import { ro_menuitem$_b } from './ro_menuitem$_b.js'
import { ro_menuoptions$_b } from './ro_menuoptions$_b.js'
import { selected_ro_menuoption$_b } from './selected_ro_menuoption$_b.js'
const key = 'ro_menu_ui_save_API_MENUS_menuoption'
export const ro_menu_ui_save_API_MENUS_menuoption_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, (ctx)=>{
	const notyf_success = notyf_success_b(ctx)
	const params_fireFlyID$ = params_fireFlyID$_b(ctx)
	const ro_menuitem$ = ro_menuitem$_b(ctx)
	const ro_menuoptions$ = ro_menuoptions$_b(ctx)
	const save_API_MENUS_menuoption = save_API_MENUS_menuoption_b(ctx)
	const selected_ro_menuoption$ = selected_ro_menuoption$_b(ctx)
	return ro_menu_ui_save_API_MENUS_menuoption as ro_menu_ui_save_API_MENUS_menuoption_T
	async function ro_menu_ui_save_API_MENUS_menuoption(ro_menuoption:RoMenuoption_I) {
		const requestData = new MenuoptionAPIRequestQuery()
		MenuoptionAPIRequestQuery.fill_fireFlyID(requestData, params_fireFlyID$.$)
		MenuoptionAPIRequestQuery.fill_ro_menuoption(requestData, ro_menuoption)
		const payload = await save_API_MENUS_menuoption(requestData, ro_menuoption, ro_menuitem$.$)
		const is_new = is_new_o_(ro_menuoption)
		if (payload.Status === STATUS_SUCCESS) {
			// In case of New item, put it in the list
			if (is_new) {
				const ro_menuoptions = ro_menuoptions$.$
				ro_menuoptions.push(payload.Data)
				ro_menuoptions$.$ = ro_menuoptions
			}
			assign(ro_menuoption, payload.Data, errors_o_())
			await notyf_success(`${ro_menuoption.Name} ${is_new ? 'added' : 'updated'} successfully.`)
		} else if (payload.Code === 'ERR_NAME_EXIST') {
			assign(ro_menuoption, errors_o_({
				Name_errors: [`Name "${ro_menuoption.Name}" already exists. Please pick another name.`]
			}))
		} else {
			assign(ro_menuoption, errors_o_({
				errors: [`Unable to ${is_new ? 'add' : 'update'} item, Please try later.`]
			}))
		}
		ro_menuoptions$.refresh()
		selected_ro_menuoption$.refresh()
		return payload
	}
})
export type ro_menu_ui_save_API_MENUS_menuoption_T = (ro_menuoption:RoMenuoption_I)=>
	Promise<save_API_MENUS_menuoption_payload_T>
function errors_o_(override_errors_o?:RoMenuoption_ui_I) {
	return assign({ errors: [], Name_errors: [] }, override_errors_o)
}
