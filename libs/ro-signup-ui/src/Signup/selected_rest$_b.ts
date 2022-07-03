import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { Restaurant } from '@menus/restaurant'
import type { ro_signup_ui_Ctx } from '../ro_signup_ui_Ctx.js'
const key = 'selected_rest$'
export const selected_rest$_b:B<ro_signup_ui_Ctx, typeof key> = be_(key, () => {
	return writable$<Restaurant>(null) as selected_rest$_T
})
export type selected_rest$_T = Writable$<Restaurant>
