import { writable$, Writable$ } from '@ctx-core/store'
import { B, be_ } from '@ctx-core/object'
import type { consumer_shopping_cart_Ctx } from './consumer_shopping_cart_Ctx.js'
const key = 'shopping_cart_busy'
export const shopping_cart_busy_b:B<consumer_shopping_cart_Ctx, typeof key> = be_(key, ()=>
	writable$(false) as shopping_cart_busy_T
)
export type shopping_cart_busy_T = Writable$<boolean>
