import { B, be_ } from '@ctx-core/object'
import { params_fireFlyID$_b, params_MenuItemID$_b } from '@menus/page'
import {
	MenuoptionitemAPIRequestQuery, RoRequestQuery, save_API_MENUS_menuoptionitem_b,
	save_API_MENUS_menuoptionitem_payload_T
} from '@menus/ro-http'
import { RoMenuoption_I, RoMenuoptionitem_I } from '@menus/ro-shared-models'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
const key = 'ro_menu_ui_save_API_MENUS_menuoptionitem'
export const ro_menu_ui_save_API_MENUS_menuoptionitem_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, (ctx)=>{
	const save_API_MENUS_menuoptionitem = save_API_MENUS_menuoptionitem_b(ctx)
	const params_fireFlyID$ = params_fireFlyID$_b(ctx)
	const params_menuitemID$ = params_MenuItemID$_b(ctx)
	return async function ro_menu_ui_save_API_MENUS_menuoptionitem(ro_menuoption:RoMenuoption_I, menuoptionitem:RoMenuoptionitem_I) {
		const requestData = new MenuoptionitemAPIRequestQuery()
		MenuoptionitemAPIRequestQuery.fill_fireFlyID(requestData, params_fireFlyID$.$)
		MenuoptionitemAPIRequestQuery.fill_menuoptionitem(requestData, menuoptionitem)
		RoRequestQuery.fill_MenuoptionID(requestData, ro_menuoption.ID)
		RoRequestQuery.fill_menuitemID(requestData, params_menuitemID$.$)
		return (
			await save_API_MENUS_menuoptionitem(requestData, menuoptionitem)
		) as save_API_MENUS_menuoptionitem_payload_T
		/* Explicitly setting type to avoid *.d.ts type changing between commits */
	}
})
export type ro_menu_ui_save_API_MENUS_menuoptionitem_T = (ro_menuoption:RoMenuoption_I, menuoptionitem:RoMenuoptionitem_I)=>
	Promise<save_API_MENUS_menuoptionitem_payload_T>
