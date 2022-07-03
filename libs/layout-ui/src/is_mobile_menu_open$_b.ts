import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { layout_ui_Ctx } from './layout_ui_Ctx.js'
const key = 'is_mobile_menu_open$'
export const is_mobile_menu_open$_b:B<layout_ui_Ctx, typeof key> = be_(key, ctx=>{
	const is_mobile_menu_open$ = writable$(false)
	
	return is_mobile_menu_open$ as is_mobile_menu_open$_T
})
export interface is_mobile_menu_open$_T extends Writable$<boolean> {
	set($is_mobile_menu_openBool:boolean):void
}
