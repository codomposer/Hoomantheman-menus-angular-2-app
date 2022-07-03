import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { manage_platform_ui_Ctx } from './manage_platform_ui_Ctx.js'
const key = 'manage_platform_settings_save_busy$'
export const manage_platform_settings_save_busy$_b:B<manage_platform_ui_Ctx, typeof key> = be_(key, ()=>{
	return writable$(false)
})
export type manage_platform_settings_save_busy$_T = Writable$<boolean>
