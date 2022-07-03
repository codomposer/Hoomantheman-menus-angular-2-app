import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { color_ui_Ctx } from './color_ui_Ctx.js'
const key = 'vanilla_picker_loaded$'
export const vanilla_picker_loaded$_b:B<color_ui_Ctx, typeof key> = be_(key, ()=>
	writable$<boolean>(false) as vanilla_picker_loaded$_T
)
export type vanilla_picker_loaded$_T = Writable$<boolean>
