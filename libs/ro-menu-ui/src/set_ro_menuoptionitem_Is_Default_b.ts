import { B, be_ } from '@ctx-core/object'
import { RoMenuoption_I, RoMenuoptionitem_I } from '@menus/ro-shared-models'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
import { ro_menuoptionitems$_b } from './ro_menuoptionitems$_b.js'
import { save_ro_menuoptionitem_b } from './save_ro_menuoptionitem_b.js'
const key = 'set_ro_menuoptionitem_Is_Default'
export const set_ro_menuoptionitem_Is_Default_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_menuoptionitems$ = ro_menuoptionitems$_b(ctx)
	const save_ro_menuoptionitem = save_ro_menuoptionitem_b(ctx)
	return async function set_ro_menuoptionitem_Is_Default(
		ro_menuoption:RoMenuoption_I, ro_menuoptionitem:RoMenuoptionitem_I
	) {
		const ro_menuoptionitems = ro_menuoptionitems$.$
		for (const i_menuoptionitem of ro_menuoptionitems) {
			i_menuoptionitem.Is_Default = false
		}
		ro_menuoptionitem.Is_Default = true
		ro_menuoptionitems$.refresh()
		if (!ro_menuoptionitem.edit_mode) {
			await save_ro_menuoptionitem(ro_menuoption, ro_menuoptionitem)
		}
	}
})
export type set_ro_menuoptionitem_Is_Default_T = (ro_menuoption:RoMenuoption_I, ro_menuoptionitem:RoMenuoptionitem_I)=>
	Promise<void>
