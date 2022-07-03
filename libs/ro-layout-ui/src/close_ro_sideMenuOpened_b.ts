import { has_dom } from '@ctx-core/dom'
import { B, be_ } from '@ctx-core/object'
import { COL_SM_MAX } from '@menus/web-config'
import { in_ro_sideMenuOpened$_b } from './in_ro_sideMenuOpened$_b.js'
import type { ro_layout_ui_Ctx } from './ro_layout_ui_Ctx.js'
const key = 'close_ro_sideMenuOpened'
export const close_ro_sideMenuOpened_b:B<ro_layout_ui_Ctx, typeof key> = be_(key, (ctx)=>{
	const in_ro_sideMenuOpened$ = in_ro_sideMenuOpened$_b(ctx)
	if (has_dom) {
		if (!in_ro_sideMenuOpened$.$) {
			close_ro_sideMenuOpened('desktop')
		}
		window.addEventListener('resize', ()=>{
			const width = window.innerWidth
			if (width <= COL_SM_MAX) {
				const in_ro_sideMenuOpened = in_ro_sideMenuOpened$.$
				if (in_ro_sideMenuOpened) {
					close_ro_sideMenuOpened()
				}
			}
		})
	}
	return close_ro_sideMenuOpened as close_ro_sideMenuOpened_T
	function close_ro_sideMenuOpened(device?:string) {
		if (device) {
			if (device === 'mobile' && window.innerWidth <= COL_SM_MAX) {
				_close_ro_sideMenuOpened()
			}
			if (device === 'desktop' && window.innerWidth > COL_SM_MAX) {
				_close_ro_sideMenuOpened()
			}
		} else {
			_close_ro_sideMenuOpened()
		}
	}
	function _close_ro_sideMenuOpened() {
		in_ro_sideMenuOpened$.$ = false
	}
})
export type close_ro_sideMenuOpened_T = ()=>void
