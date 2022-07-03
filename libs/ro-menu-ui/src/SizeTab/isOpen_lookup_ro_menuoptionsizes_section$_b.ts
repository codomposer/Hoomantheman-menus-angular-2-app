import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
const key = 'isOpen_lookup_ro_menuoptionsizes_section$'
export const isOpen_lookup_ro_menuoptionsizes_section$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ()=>
	writable$<boolean>(false) as isOpen_lookup_ro_menuoptionsizes_section$_T
)
export type isOpen_lookup_ro_menuoptionsizes_section$_T = Writable$<boolean>
