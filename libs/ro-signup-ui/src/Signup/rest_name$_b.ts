import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { ro_signup_ui_Ctx } from '../ro_signup_ui_Ctx.js'
const key = 'rest_name$'
export const rest_name$_b:B<ro_signup_ui_Ctx, typeof key> = be_(key, () => {
	return writable$(null)
})
export type rest_name$_T = Writable$<string>
