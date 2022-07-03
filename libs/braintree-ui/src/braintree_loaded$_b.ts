import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { braintree_ui_Ctx } from './braintree_ui_Ctx.js'
const key = 'braintree_loaded$'
export const braintree_loaded$_b:B<braintree_ui_Ctx, typeof key> = be_(key, ()=>
	writable$<boolean>(false) as braintree_loaded$_T
)
export interface braintree_loaded$_T extends Writable$<boolean> {}
