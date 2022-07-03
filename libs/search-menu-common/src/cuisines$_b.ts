import { B, be_ } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { Cuisine } from '@menus/cuisine'
import type { search_menu_common_Ctx } from './search_menu_common_Ctx.js'
const key = 'cuisines$'
export const cuisines$_b:B<search_menu_common_Ctx, typeof key> = be_(key, ()=>
	writable$([]) as cuisines$_T
)
export type cuisines$_T = Writable$<Cuisine[]>
