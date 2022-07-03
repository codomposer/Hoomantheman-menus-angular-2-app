import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { braintree_ui_Ctx } from './braintree_ui_Ctx.js'
const key = 'braintree_apple_pay_loaded$'
export const braintree_apple_pay_loaded$_b:B<braintree_ui_Ctx, typeof key> = be_(key, ()=>
	writable$<boolean>(false) as braintree_apple_pay_loaded$_T
)
export type braintree_apple_pay_loaded$_T = Writable$<boolean>
