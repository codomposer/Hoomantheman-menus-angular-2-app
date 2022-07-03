import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { consumer_auth_ui_Ctx } from '../consumer_auth_ui_Ctx.js'
const key = 'forgot_password_email_phone$'
export const forgot_password_email_phone$_b:B<consumer_auth_ui_Ctx, typeof key> = be_(key, ()=>
	writable$<string>(null) as forgot_password_email_phone$_T
)
export type forgot_password_email_phone$_T = Writable$<string>
