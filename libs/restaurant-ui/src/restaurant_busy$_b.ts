import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { restaurant_ui_Ctx } from './restaurant_ui_Ctx.js'
const key = 'restaurant_busy$'
export const restaurant_busy$_b:B<restaurant_ui_Ctx, typeof key> = be_(key, ()=>
	writable$<boolean>(false) as restaurant_busy$_T
)
export type restaurant_busy$_T = Writable$<boolean>
