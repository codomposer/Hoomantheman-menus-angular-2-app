import { B, be_ } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { ro_signup_ui_Ctx } from '../ro_signup_ui_Ctx.js'
const key = 'Signup_fireFlyID$'
export const Signup_fireFlyID$_b:B<ro_signup_ui_Ctx, typeof key> = be_(key, () => {
	return writable$<string>(null) as Signup_fireFlyID$_T
})
export type Signup_fireFlyID$_T = Writable$<string>
