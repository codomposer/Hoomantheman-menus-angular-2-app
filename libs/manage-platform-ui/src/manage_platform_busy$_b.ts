import { B, be_ } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { manage_platform_ui_Ctx } from './manage_platform_ui_Ctx.js'
const key = 'manage_platform_busy$'
export const manage_platform_busy$_b:B<manage_platform_ui_Ctx, typeof key> = be_(key, ()=>
	writable$(false)
)
export type manage_platform_busy$_T = Writable$<boolean>
