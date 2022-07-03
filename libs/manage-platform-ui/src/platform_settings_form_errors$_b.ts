import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { manage_platform_ui_Ctx } from './manage_platform_ui_Ctx.js'
const key = 'platform_settings_form_errors$'
export const platform_settings_form_errors$_b:B<manage_platform_ui_Ctx, typeof key> = be_(key, ()=>{
	return writable$([])
})
export type platform_settings_form_errors$_T = Writable$<string[]>
