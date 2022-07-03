import { Writable$, writable$ } from '@ctx-core/store'
import { B, be_ } from '@ctx-core/object'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
export const ITEM_INFO_TAB = 'ITEM_INFO_TAB'
export const SIZE_TAB = 'SIZE_TAB'
export const OPTION_TAB = 'OPTION_TAB'
const key = 'MenuitemDetails_activeTab$'
export const MenuitemDetails_activeTab$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ()=>
	writable$<string>(ITEM_INFO_TAB)
)
export type MenuitemDetails_activeTab$_T = Writable$<string>
