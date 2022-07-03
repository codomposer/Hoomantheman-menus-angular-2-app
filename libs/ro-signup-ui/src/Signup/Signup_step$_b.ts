import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import { ro_signup_ui_Ctx } from '../ro_signup_ui_Ctx'
import type { STEP_T } from './STEP.js'
import { STEP_ZIPCODE } from './STEP.js'
const key = 'Signup_step$'
export const Signup_step$_b:B<ro_signup_ui_Ctx, typeof key> = be_(key, () => {
	return writable$<STEP_T>(STEP_ZIPCODE)
})
export type Signup_step$_T = Writable$<STEP_T>
