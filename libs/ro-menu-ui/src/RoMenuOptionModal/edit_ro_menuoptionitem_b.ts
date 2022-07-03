import { B, be_ } from '@ctx-core/object'
import { RoMenuoptionitem_I } from '@menus/ro-shared-models'
import { deep_clone } from '@menus/util'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { ro_menuoptionitems$_b } from '../ro_menuoptionitems$_b.js'
import { selected_ro_menuoption$_b } from '../selected_ro_menuoption$_b.js'
const key = 'edit_ro_menuoptionitem'
export const edit_ro_menuoptionitem_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_menuoptionitems$ = ro_menuoptionitems$_b(ctx)
	const selected_ro_menuoption$ = selected_ro_menuoption$_b(ctx)
	return edit_ro_menuoptionitem as edit_ro_menuoptionitem_T
	async function edit_ro_menuoptionitem(ro_menuoptionitem:RoMenuoptionitem_I) {
		ro_menuoptionitem.edit_mode = true
		ro_menuoptionitem.undo = deep_clone(ro_menuoptionitem)
		ro_menuoptionitems$.refresh()
		selected_ro_menuoption$.refresh()
	}
})
export type edit_ro_menuoptionitem_T = (ro_menuoptionitem:RoMenuoptionitem_I)=>Promise<void>
