import { B, be_ } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { consumer_layout_ui_Ctx } from './consumer_layout_ui_Ctx.js'
const key = 'is_ProfileHandle_open$'
export const is_ProfileHandle_open$_b:B<consumer_layout_ui_Ctx, typeof key> = be_(key, ()=>
	writable$(false) as is_ProfileHandle_open$_T
)
export type is_ProfileHandle_open$_T = Writable$<boolean>
