import { B, be_ } from '@ctx-core/object'
import { Readable$, writable$ } from '@ctx-core/store'
import type { consumer_layout_ui_Ctx } from '../consumer_layout_ui_Ctx.js'
const key = 'main_dashboard_content$'
export const main_dashboard_content$_b:B<consumer_layout_ui_Ctx, typeof key> = be_(key, ()=>
	writable$(null) as main_dashboard_content$_T
)
export type main_dashboard_content$_T = Readable$<HTMLDivElement>
