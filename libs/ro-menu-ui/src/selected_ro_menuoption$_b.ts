import { B, be_ } from '@ctx-core/object'
import { RoMenuoption, RoMenuoption_I } from '@menus/ro-shared-models'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
const key = 'selected_ro_menuoption$'
export const selected_ro_menuoption$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ()=>{
	const selected_ro_menuoption$ = refresh_writable_<RoMenuoption_I>(new RoMenuoption()) as selected_ro_menuoption$_T
	return selected_ro_menuoption$
})
export interface selected_ro_menuoption$_T extends refresh_writable_T<RoMenuoption_I> {}
