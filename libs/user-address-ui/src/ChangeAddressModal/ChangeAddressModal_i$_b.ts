import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { user_address_ui_Ctx } from '../user_address_ui_Ctx.js'
import type { ChangeAddressModal_T } from './ChangeAddressModal_T.js'
const key = 'ChangeAddressModal_i$'
export const ChangeAddressModal_i$_b:B<user_address_ui_Ctx, typeof key> = be_(key, ()=>
	writable$<ChangeAddressModal_T>(null) as ChangeAddressModal_i$_T
)
export type ChangeAddressModal_i$_T = Writable$<ChangeAddressModal_T>
