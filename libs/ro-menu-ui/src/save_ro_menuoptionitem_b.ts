import { assign, B, be_ } from '@ctx-core/object'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { RoMenuoption_I, RoMenuoptionitem_I } from '@menus/ro-shared-models'
import { is_new_o_ } from '@menus/util'
import { STATUS_SUCCESS } from '@menus/web-config'
import { close_ro_menuoptionitem_b } from './close_ro_menuoptionitem_b.js'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
import { ro_menu_ui_save_API_MENUS_menuoptionitem_b } from './ro_menu_ui_save_API_MENUS_menuoptionitem_b.js'
import { ro_menuoptionitems$_b } from './ro_menuoptionitems$_b.js'
const key = 'save_ro_menuoptionitem'
export const save_ro_menuoptionitem_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, (ctx)=>{
	const close_ro_menuoptionitem = close_ro_menuoptionitem_b(ctx)
	const notyf_success = notyf_success_b(ctx)
	const notyf_error = notyf_error_b(ctx)
	const ro_menuoptionitems$ = ro_menuoptionitems$_b(ctx)
	const ro_menu_ui_save_API_MENUS_menuoptionitem = ro_menu_ui_save_API_MENUS_menuoptionitem_b(ctx)
	return async function save_ro_menuoptionitem(ro_menuoption:RoMenuoption_I, ro_menuoptionitem:RoMenuoptionitem_I) {
		if (ro_menuoptionitem.Name_errors?.length || ro_menuoptionitem.Price_errors?.length) return
		const payload = await ro_menu_ui_save_API_MENUS_menuoptionitem(ro_menuoption, ro_menuoptionitem)
		const is_new = is_new_o_(ro_menuoptionitem)
		if (payload.Status === STATUS_SUCCESS) {
			// In case of New item, put it in the list
			if (is_new) {
				const ro_menuoptionitems = ro_menuoptionitems$.$
				const index = ro_menuoptionitems.indexOf(ro_menuoptionitem)
				if (~index) {
					ro_menuoptionitems.splice(index, 1, payload.Data)
				} else {
					ro_menuoptionitems.push(payload.Data)
				}
				ro_menuoptionitems$.$ = ro_menuoptionitems
			} else {
				assign(ro_menuoptionitem, payload.Data)
			}
			await notyf_success(`${ro_menuoptionitem.Name} ${is_new ? 'added' : 'updated'} successfully.`)
		} else {
			await notyf_error(`Unable to ${is_new ? 'add' : 'update'} item, Please try later.`)
		}
		await close_ro_menuoptionitem(ro_menuoptionitem)
	}
})
export type save_ro_menuoptionitem_T = (ro_menuoption:RoMenuoption_I, ro_menuoptionitem:RoMenuoptionitem_I)=>
	Promise<void>
