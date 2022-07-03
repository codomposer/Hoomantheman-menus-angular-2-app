import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { search_menu_common_Ctx } from './search_menu_common_Ctx.js'
const key = 'cuisines_busy$'
export const cuisines_busy$_b:B<search_menu_common_Ctx, typeof key> = be_(key, ()=>
	writable$(false) as cuisines_busy$_T
)
export type cuisines_busy$_T = Writable$<boolean>
