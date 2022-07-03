import { B, be_, deep_clone } from '@ctx-core/object'
import type { RoMenuoptionsize_I } from '@menus/ro-shared-models'
import { ro_menuoptionsizes$_b } from '../ro_menuoptionsizes$_b.js'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
const key = 'edit_ro_menuoptionsize'
export const edit_ro_menuoptionsize_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ctx=>{
	const ro_menuoptionsizes$ = ro_menuoptionsizes$_b(ctx)
	return edit_ro_menuoptionsize as edit_ro_menuoptionsize_T
	function edit_ro_menuoptionsize(ro_menuoptionsizes:RoMenuoptionsize_I) {
		ro_menuoptionsizes.previous_Is_Default_ro_menuoptionsize = null
		ro_menuoptionsizes.undo = deep_clone(ro_menuoptionsizes)
		ro_menuoptionsizes$.refresh()
	}
})
export type edit_ro_menuoptionsize_T = (Menuoptionsize:RoMenuoptionsize_I)=>void
