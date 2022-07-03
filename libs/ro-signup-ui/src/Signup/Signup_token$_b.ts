import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { ro_signup_ui_Ctx } from '../ro_signup_ui_Ctx.js'
const key = 'Signup_token$'
export const Signup_token$_b:B<ro_signup_ui_Ctx, typeof key> = be_(key, ()=>{
	return writable$<string>(null) as Signup_token$_T
})
export type Signup_token$_T = Writable$<string>
