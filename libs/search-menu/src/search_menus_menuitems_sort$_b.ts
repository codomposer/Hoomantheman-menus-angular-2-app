import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { search_menu_Ctx } from './search_menu_Ctx.js'
const key = 'search_menus_menuitems_sort$'
export const search_menus_menuitems_sort$_b:B<search_menu_Ctx, typeof key> = be_(key, ()=>
	writable$<number>(0))
export type search_menus_menuitems_sort$_T = Writable$<number>
