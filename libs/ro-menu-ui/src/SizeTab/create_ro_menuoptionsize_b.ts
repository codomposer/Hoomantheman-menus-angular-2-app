import { B, be_ } from '@ctx-core/object'
import { RoMenuoptionsize } from '@menus/ro-shared-models'
import { ro_menuoptionsizes$_b } from '../ro_menuoptionsizes$_b.js'
import { ro_menuitem$_b } from '../ro_menuitem$_b.js'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { edit_ro_menuoptionsize_b } from './edit_ro_menuoptionsize_b.js'
import { menuoptionsize_edit_a$_b } from './menuoptionsize_edit_a$_b.js'
const key = 'create_ro_menuoptionsize'
export const create_ro_menuoptionsize_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ctx=>{
	const ro_menuoptionsizes$ = ro_menuoptionsizes$_b(ctx)
	const edit_ro_menuoptionsize = edit_ro_menuoptionsize_b(ctx)
	const menuoptionsize_edit_a$ = menuoptionsize_edit_a$_b(ctx)
	const ro_menuitem$ = ro_menuitem$_b(ctx)
	return create_ro_menuoptionsize as create_ro_menuoptionsize_T
	function create_ro_menuoptionsize() {
		const ro_menuoptionsize = new RoMenuoptionsize()
		ro_menuoptionsize.ID = -Date.now()
		menuoptionsize_edit_a$.$[ro_menuoptionsizes$.$.length] = true
		menuoptionsize_edit_a$.refresh()
		ro_menuoptionsizes$.update(ro_menuoptionsizes=>{
			ro_menuoptionsizes.push(ro_menuoptionsize)
			return ro_menuoptionsizes
		})
		edit_ro_menuoptionsize(ro_menuoptionsize)
		ro_menuitem$.refresh({
			Is_Single_Size: false,
		})
	}
})
export type create_ro_menuoptionsize_T = ()=>void
