import { assign, B, be_ } from '@ctx-core/object'
import { is_new_o_ } from '@menus/util'
import { RoMenuoptionitem_I } from '@menus/ro-shared-models'
import { close_ro_menuoptionitem_b } from '../close_ro_menuoptionitem_b.js'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { ro_menuoptionitems$_b } from '../ro_menuoptionitems$_b.js'
const key = 'cancel_ro_menuoptionitem'
export const cancel_ro_menuoptionitem_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, (ctx)=>{
	const close_ro_menuoptionitem = close_ro_menuoptionitem_b(ctx)
	const ro_menuoptionitems$ = ro_menuoptionitems$_b(ctx)
	return cancel_ro_menuoptionitem as cancel_ro_menuoptionitem_T
	async function cancel_ro_menuoptionitem(ro_menuoptionitem:RoMenuoptionitem_I) {
		assign(ro_menuoptionitem, ro_menuoptionitem.undo)
		if (is_new_o_(ro_menuoptionitem)) {
			const ro_menuoptionitems = ro_menuoptionitems$.$
			const index = ro_menuoptionitems.indexOf(ro_menuoptionitem)
			if (~index) {
				ro_menuoptionitems.splice(index, 1)
			}
		}
		await close_ro_menuoptionitem(ro_menuoptionitem)
	}
})
export type cancel_ro_menuoptionitem_T = (ro_menuoptionitem:RoMenuoptionitem_I)=>Promise<void>
