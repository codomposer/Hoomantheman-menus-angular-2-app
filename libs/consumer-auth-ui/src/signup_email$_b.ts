import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { consumer_auth_ui_Ctx } from './consumer_auth_ui_Ctx.js'
const key = 'signup_email$'
export const signup_email$_b:B<consumer_auth_ui_Ctx, typeof key> = be_(key, ()=>
	writable$<string>(null)
)
export type signup_email$_T = Writable$<string>
