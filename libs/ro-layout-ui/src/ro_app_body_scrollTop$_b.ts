import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { ro_layout_ui_Ctx } from './ro_layout_ui_Ctx.js'
const key = 'ro_app_body_scrollTop$'
export const ro_app_body_scrollTop$_b:B<ro_layout_ui_Ctx, typeof key> = be_(key, ()=>
	writable$(0) as ro_app_body_scrollTop$_T
)
export type ro_app_body_scrollTop$_T = Writable$<number>
