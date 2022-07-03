import { assign, B, be_ } from '@ctx-core/object'
import { refresh_writable_, invalidate_mixin_T, refresh_writable_T } from '@menus/store'
import type { RoMenuoption_I } from '@menus/ro-shared-models'
import {
	API_MENUS_menuoption_list_payload$_b, success_API_MENUS_menuoption_list_payload_T
} from '@menus/ro-restaurant-ui'
import type { is_ERR_INVALID_ACCESS$_mixin_T } from '@menus/ro-restaurant'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
const key = 'ro_menuoptions$'
export const ro_menuoptions$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ctx=>{
	const ro_menuoptions$ = refresh_writable_<RoMenuoption_I[]>(undefined)
	const API_MENUS_menuoption_list_payload$ = API_MENUS_menuoption_list_payload$_b(ctx)
	const unsubscribers = [
		API_MENUS_menuoption_list_payload$.subscribe(API_MENUS_menuoption_list_payload=>{
			const ro_menuoptions = (
				API_MENUS_menuoption_list_payload as success_API_MENUS_menuoption_list_payload_T
			)?.Data
			if (ro_menuoptions) {
				ro_menuoptions$.$ = ro_menuoptions
			} else {
				ro_menuoptions$.$ = null
			}
		})
	]
	return assign(ro_menuoptions$, {
		onDestroy() {
			unsubscribers.forEach(fn=>fn())
		},
		invalidate: API_MENUS_menuoption_list_payload$.invalidate,
		is_ERR_INVALID_ACCESS$: API_MENUS_menuoption_list_payload$.is_ERR_INVALID_ACCESS$
	})
})
export interface ro_menuoptions$_T extends refresh_writable_T<RoMenuoption_I[]>,
	invalidate_mixin_T, is_ERR_INVALID_ACCESS$_mixin_T {
	invalidate():void
}
