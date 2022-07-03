import { B, be_ } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
const key = 'RoMenuOptionModal_busy$'
export const RoMenuOptionModal_busy$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ()=>{
	return writable$(false) as RoMenuOptionModal_busy$_T
})
export type RoMenuOptionModal_busy$_T = Writable$<boolean>
