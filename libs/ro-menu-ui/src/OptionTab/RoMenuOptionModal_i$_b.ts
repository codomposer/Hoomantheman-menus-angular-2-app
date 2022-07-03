import { B, be_ } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { RoMenuOptionModal_I } from '../RoMenuOptionModal/index.js'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
const key = 'RoMenuOptionModal_i$'
export const RoMenuOptionModal_i$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ()=>{
	return writable$(null) as RoMenuOptionModal_i$_T
})
export type RoMenuOptionModal_i$_T = Writable$<RoMenuOptionModal_I>
