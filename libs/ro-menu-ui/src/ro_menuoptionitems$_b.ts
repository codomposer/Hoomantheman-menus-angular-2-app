import { B, be_, assign } from '@ctx-core/object'
import { API_MENUS_menuoptionitem_list_b, RoRequestQuery } from '@menus/ro-http'
import type { RoMenuoptionitem_I } from '@menus/ro-shared-models'
import { params_fireFlyID$_b, params_MenuItemID$_b } from '@menus/page'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
import { selected_ro_menuoption$_b } from './selected_ro_menuoption$_b.js'
const key = 'ro_menuoptionitems$'
export const ro_menuoptionitems$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ctx=>{
	const API_MENUS_menuoptionitem_list = API_MENUS_menuoptionitem_list_b(ctx)
	const params_fireFlyID$ = params_fireFlyID$_b(ctx)
	const params_MenuItemID$ = params_MenuItemID$_b(ctx)
	const selected_ro_menuoption$ = selected_ro_menuoption$_b(ctx)
	const ro_menuoptionsitems$ = refresh_writable_<RoMenuoptionitem_I[]>([])
	return assign(ro_menuoptionsitems$, {
		reload,
	}) as ro_menuoptionitems$_T
	async function reload() {
		const params_fireFlyID = params_fireFlyID$.$
		const params_menuitemID = params_MenuItemID$.$
		const ro_menuoption = selected_ro_menuoption$.$
		ro_menuoptionsitems$.set([])
		if (!ro_menuoption?.ID) return
		const requestData = new RoRequestQuery()
		RoRequestQuery.fill_fireFlyID(requestData, params_fireFlyID)
		RoRequestQuery.fill_menuitemID(requestData, params_menuitemID)
		RoRequestQuery.fill_MenuoptionID(requestData, ro_menuoption.ID)
		const payload = await API_MENUS_menuoptionitem_list(requestData)
		ro_menuoptionsitems$.set(payload)
	}
})
export interface ro_menuoptionitems$_T extends refresh_writable_T<RoMenuoptionitem_I[]> {
	reload():Promise<void>
}
