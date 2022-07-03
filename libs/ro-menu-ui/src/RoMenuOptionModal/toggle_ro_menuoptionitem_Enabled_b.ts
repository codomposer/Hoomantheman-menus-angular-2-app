import { B, be_ } from '@ctx-core/object'
import { is_new_o_ } from '@menus/util'
import { CheckBox_change_evt_T } from '@menus/form-ui'
import { RoMenuoption_I, RoMenuoptionitem_I } from '@menus/ro-shared-models'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { save_ro_menuoptionitem_b } from '../save_ro_menuoptionitem_b.js'
import { RoMenuOptionModal_busy$_b } from './RoMenuOptionModal_busy$_b.js'
const key = 'toggle_ro_menuoptionitem_Enabled'
export const toggle_ro_menuoptionitem_Enabled_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, (ctx)=>{
	const RoMenuOptionModal_busy$ = RoMenuOptionModal_busy$_b(ctx)
	const save_ro_menuoptionitem = save_ro_menuoptionitem_b(ctx)
	return toggle_ro_menuoptionitem_Enabled as toggle_ro_menuoptionitem_Enabled_T
	async function toggle_ro_menuoptionitem_Enabled(
		evt:CheckBox_change_evt_T, ro_menuoption:RoMenuoption_I, ro_menuoptionitem:RoMenuoptionitem_I
	) {
		ro_menuoptionitem.Enabled = evt.detail as boolean
		if (!is_new_o_(ro_menuoptionitem)) {
			RoMenuOptionModal_busy$.$ = true
			try {
				await save_ro_menuoptionitem(ro_menuoption, ro_menuoptionitem)
			} finally {
				RoMenuOptionModal_busy$.$ = false
			}
		}
	}
})
export type toggle_ro_menuoptionitem_Enabled_T = (
	evt:CheckBox_change_evt_T, ro_menuoption:RoMenuoption_I, ro_menuoptionitem:RoMenuoptionitem_I
)=>Promise<void>
