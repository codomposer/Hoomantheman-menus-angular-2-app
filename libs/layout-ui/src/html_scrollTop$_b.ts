import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { layout_ui_Ctx } from './layout_ui_Ctx.js'
const key = 'html_scrollTop$'
export const html_scrollTop$_b:B<layout_ui_Ctx, typeof key> = be_(key, ()=>
	writable$(0))
export type html_scrollTop$_T = Writable$<number>
