import { not } from '@ctx-core/function'
import { B, be_ } from '@ctx-core/object'
import { is_mobile_menu_open$_b } from '@menus/layout-ui'
import type { consumer_layout_ui_Ctx } from './consumer_layout_ui_Ctx.js'
import { is_ProfileHandle_open$_b } from './is_ProfileHandle_open$_b.js'
const key = 'toggle_ProfileHandle'
export const toggle_ProfileHandle_b:B<consumer_layout_ui_Ctx, typeof key> = be_(key, ctx=>{
	const is_mobile_menu_open$ = is_mobile_menu_open$_b(ctx)
	const is_ProfileHandle_open$ = is_ProfileHandle_open$_b(ctx)
	return toggle_ProfileHandle as toggle_ProfileHandle_T
	function toggle_ProfileHandle(MobilMenu_close = false) {
		is_ProfileHandle_open$.update(not)
		if (MobilMenu_close) {
			is_mobile_menu_open$.set(false)
		}
	}
})
export type toggle_ProfileHandle_T = (MobilMenu_close?:boolean)=>void
