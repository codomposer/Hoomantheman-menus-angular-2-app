import { not } from '@ctx-core/function'
import { B, be_ } from '@ctx-core/object'
import { COL_SM_MAX } from '@menus/web-config'
import { in_ro_sideMenuOpened$_b } from './in_ro_sideMenuOpened$_b.js'
import type { ro_layout_ui_Ctx } from './ro_layout_ui_Ctx.js'
const key = 'toggle_ro_sideMenuOpened'
export const toggle_ro_sideMenuOpened_b:B<ro_layout_ui_Ctx, typeof key> = be_(key, (ctx)=>{
	const in_ro_sideMenuOpened$ = in_ro_sideMenuOpened$_b(ctx)
	return toggle_ro_sideMenuOpened as toggle_ro_sideMenuOpened_T
	function toggle_ro_sideMenuOpened(device?:string) {
		if (device) {
			if (device === 'mobile' && window.innerWidth <= COL_SM_MAX) {
				_toggle_ro_sideMenuOpened()
			}
			if (device === 'desktop' && window.innerWidth > COL_SM_MAX) {
				_toggle_ro_sideMenuOpened()
			}
		} else {
			_toggle_ro_sideMenuOpened()
		}
	}
	function _toggle_ro_sideMenuOpened() {
		in_ro_sideMenuOpened$.update(not)
	}
})
export type toggle_ro_sideMenuOpened_T = ()=>void
