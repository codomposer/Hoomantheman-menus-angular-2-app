import { B, be_, assign } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
const key = 'ro_menuitem_is_new_multisize$'
export const ro_menuitem_is_new_multisize$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ()=>{
	const ro_menuitem_is_new_multisize$ = writable$<boolean>(false)
	return assign(ro_menuitem_is_new_multisize$, {
		reset() {
			ro_menuitem_is_new_multisize$.set(false)
		}
	}) as ro_menuitem_is_new_multisize$_T
})
export interface ro_menuitem_is_new_multisize$_T extends Writable$<boolean> {
	reset():void
}
