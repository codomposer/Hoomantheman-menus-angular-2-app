import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { ro_layout_ui_Ctx } from './ro_layout_ui_Ctx.js'
const key = 'ro_activeTab$'
export const ro_activeTab$_b:B<ro_layout_ui_Ctx, typeof key> = be_(key, ()=>
	writable$(''))
export interface ro_activeTab$_T extends Writable$<string> {}
