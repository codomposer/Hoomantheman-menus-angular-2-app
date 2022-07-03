import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { consumer_auth_ui_Ctx } from './consumer_auth_ui_Ctx.js'
const key = 'signup_phone$'
export const signup_phone$_b:B<consumer_auth_ui_Ctx, typeof key> = be_(key, ()=>
	writable$<string>(null) as signup_phone$_T
)
export type signup_phone$_T = Writable$<string>
