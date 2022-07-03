import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { consumer_shopping_cart_Ctx } from './consumer_shopping_cart_Ctx.js'
const key = 'is_shopping_cart_busy$'
export const is_shopping_cart_busy$_b:B<consumer_shopping_cart_Ctx, typeof key> = be_(key, ()=>
	writable$(false) as is_shopping_cart_busy$_T
)
export type is_shopping_cart_busy$_T = Writable$<boolean>
