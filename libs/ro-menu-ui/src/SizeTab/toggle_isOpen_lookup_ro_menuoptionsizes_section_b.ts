import { B, be_ } from '@ctx-core/object'
import { unselect_SelectItems } from '@menus/form'
import type { RoMenuoptionsize_I } from '@menus/ro-shared-models'
import { ro_menuitem$_b } from '../ro_menuitem$_b.js'
import { lookup_ro_menuoptionsizes$_b } from '../lookup_ro_menuoptionsizes$_b.js'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { isOpen_lookup_ro_menuoptionsizes_section$_b } from './isOpen_lookup_ro_menuoptionsizes_section$_b.js'
const key = 'toggle_isOpen_lookup_ro_menuoptionsizes_section'
export const toggle_isOpen_lookup_ro_menuoptionsizes_section_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ctx=>{
	const ro_menuitem$ = ro_menuitem$_b(ctx)
	const isOpen_lookup_ro_menuoptionsizes_section$ = isOpen_lookup_ro_menuoptionsizes_section$_b(ctx)
	const lookup_ro_menuoptionsizes$ = lookup_ro_menuoptionsizes$_b(ctx)
	return toggle_isOpen_lookup_ro_menuoptionsizes_section as toggle_isOpen_lookup_ro_menuoptionsizes_section_T
	function toggle_isOpen_lookup_ro_menuoptionsizes_section() {
		ro_menuitem$.refresh({
			Is_Single_Size: false,
		})
		isOpen_lookup_ro_menuoptionsizes_section$.update(
			isOpen_lookup_ro_menuoptionsizes_section=>
				!isOpen_lookup_ro_menuoptionsizes_section
		)
		lookup_ro_menuoptionsizes$.update(
			lookup_ro_menuoptionsizes=>
				unselect_SelectItems(lookup_ro_menuoptionsizes) as RoMenuoptionsize_I[]
		)
	}
})
export type toggle_isOpen_lookup_ro_menuoptionsizes_section_T = ()=>void
