import { B, be_ } from '@ctx-core/object'
import { is_mobile_menu_open$_b } from './is_mobile_menu_open$_b.js'
import type { layout_ui_Ctx } from './layout_ui_Ctx.js'
const key = 'toggle_mobile_menu'
export const toggle_mobile_menu_b:B<layout_ui_Ctx, typeof key> = be_(key, ctx=>{
	const is_mobile_menu_open$ = is_mobile_menu_open$_b(ctx)
	return toggle_mobile_menu as toggle_mobile_menu_T
	function toggle_mobile_menu() {
		is_mobile_menu_open$.set(!is_mobile_menu_open$.$)
	}
})
export type toggle_mobile_menu_T = ()=>void
