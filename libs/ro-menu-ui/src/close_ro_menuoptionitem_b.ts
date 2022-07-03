import { B, be_ } from '@ctx-core/object'
import { RoMenuoptionitem_I } from '@menus/ro-shared-models'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
import { ro_menuoptionitems$_b } from './ro_menuoptionitems$_b.js'
const key = 'close_ro_menuoptionitem'
export const close_ro_menuoptionitem_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_menuoptionitems$ = ro_menuoptionitems$_b(ctx)
	return async function close_ro_menuoptionitem(ro_menuoptionitem:RoMenuoptionitem_I) {
		ro_menuoptionitem.edit_mode = false
		ro_menuoptionitems$.refresh()
	}
})
export type close_ro_menuoptionitem_T = (ro_menuoptionitem:RoMenuoptionitem_I)=>Promise<void>
