import { neq_ } from '@ctx-core/function'
import { I } from '@ctx-core/combinators'
import { subscribe_wait_timeout } from '@ctx-core/store'
import type { Menuitem_I } from '@menus/consumer-menu'
import { ChangeAddressModal_i$_b } from '@menus/user-address-ui'
import { userAddress$_b } from '@menus/consumer-user-address'
import { isDeliverable$_b } from '@menus/service-type'
import { restaurant_frame$_b, restaurant_frame_in_sync$_b, RestaurantFrame_I } from '@menus/restaurant-frame'
import { notyf_error_b } from '@menus/notyf'
import { open_modal_b } from '@menus/modal'
import { timeout_ms } from '@menus/web-config'
import { restaurant_MenuoptionsModal$_b } from './restaurant_MenuoptionsModal$_b.js'
import { selected_menuitem$_b } from './selected_menuitem$_b.js'
import { restaurant_busy$_b } from './restaurant_busy$_b.js'
import type { MenuCartitemModal_close_T } from './MenuCartitemModal'
import type { restaurant_ui_Ctx } from './restaurant_ui_Ctx.js'
export function set_selected_menuitem_(ctx:restaurant_ui_Ctx) {
	const restaurant_frame$ = restaurant_frame$_b(ctx)
	const userAddress$ = userAddress$_b(ctx)
	const ChangeAddressModal_i$ = ChangeAddressModal_i$_b(ctx)
	const isDeliverable$ = isDeliverable$_b(ctx)
	const restaurant_busy$ = restaurant_busy$_b(ctx)
	const restaurant_MenuoptionsModal$ = restaurant_MenuoptionsModal$_b(ctx)
	const selected_menuitem$ = selected_menuitem$_b(ctx)
	const open_modal = open_modal_b(ctx)
	const notyf_error = notyf_error_b(ctx)
	const restaurant_frame_in_sync$ = restaurant_frame_in_sync$_b(ctx)
	return async function set_selected_menuitem(in_menuitem:Menuitem_I) {
		const isDeliverable =
			await subscribe_wait_timeout(isDeliverable$, neq_(null), timeout_ms)
		const show_ChangeAddressModal_i = isDeliverable && !userAddress$.$
		if (show_ChangeAddressModal_i) {
			const ChangeAddressModal_i = await subscribe_wait_timeout(ChangeAddressModal_i$, I, timeout_ms)
			await open_modal(ChangeAddressModal_i, { userAddress: null })
			if (!userAddress$.$) {
				notyf_error('Please set your delivery address to add a menu item')
				return
			}
			restaurant_busy$.set(true)
		}
		let open_promise:Promise<MenuCartitemModal_close_T>
		try {
			try {
				await subscribe_wait_timeout(restaurant_frame_in_sync$, I, timeout_ms)
			} catch (e) {
				console.error(e)
				throw e
			}
			const selected_menuitem = (restaurant_frame$.$ as RestaurantFrame_I).menuitems.find(
				menuitem=>menuitem.MenuItemID === in_menuitem.MenuItemID
			)
			selected_menuitem$.set(selected_menuitem)
			const restaurant_MenuoptionsModal =
				await subscribe_wait_timeout(restaurant_MenuoptionsModal$, I, timeout_ms)
			open_promise = restaurant_MenuoptionsModal.open(selected_menuitem$.$)
		} finally {
			if (show_ChangeAddressModal_i) {
				restaurant_busy$.set(false)
			}
		}
		await open_promise
	}
}
