import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { ro_signup_ui_Ctx } from '../ro_signup_ui_Ctx.js'
const key = 'verify_signup_token$'
export const verify_signup_token$_b:B<ro_signup_ui_Ctx, typeof key> = be_(key, () => {
	return writable$<string>('')
})
export type verify_signup_token$_T = Writable$<string>
