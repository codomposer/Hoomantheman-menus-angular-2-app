import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { ro_signup_ui_Ctx } from '../ro_signup_ui_Ctx.js'
const key = 'rest_phone$'
export const rest_phone$_b:B<ro_signup_ui_Ctx, typeof key> = be_(key, () => {
	return writable$<string>('') as rest_phone$_T
})
export type rest_phone$_T = Writable$<string>
