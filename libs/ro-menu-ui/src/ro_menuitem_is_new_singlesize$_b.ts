import { B, be_, assign } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
const key = 'ro_menuitem_is_new_singlesize$'
export const ro_menuitem_is_new_singlesize$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ()=>{
	const ro_Menuitem_is_new_singlesize$ = writable$<boolean>(false)
	return assign(ro_Menuitem_is_new_singlesize$, {
		reset() {
			ro_Menuitem_is_new_singlesize$.set(false)
		}
	}) as ro_menuitem_is_new_singlesize$_T
})
export interface ro_menuitem_is_new_singlesize$_T extends Writable$<boolean> {
	reset():void
}
