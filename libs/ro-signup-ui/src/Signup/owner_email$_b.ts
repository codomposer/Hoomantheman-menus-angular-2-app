import { B, be_ } from '@ctx-core/object'
import { ro_signup_ui_Ctx } from '../ro_signup_ui_Ctx'
import { writable$, Writable$ } from '@ctx-core/store'
const key = 'owner_email$'
export const owner_email$_b:B<ro_signup_ui_Ctx, typeof key> = be_(key, () => {
	return writable$<string>(null) as owner_email$_T
})
export type owner_email$_T = Writable$<string>
