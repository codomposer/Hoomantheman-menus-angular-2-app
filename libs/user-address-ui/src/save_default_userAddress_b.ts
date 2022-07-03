import { neql_ } from '@ctx-core/function'
import { B, be_ } from '@ctx-core/object'
import { subscribe_wait_for_timeout } from '@ctx-core/store'
import { MSG_WARN_CHANGE_ADDRESS, timeout_ms } from '@menus/web-config'
import { shopping_cart_b } from '@menus/consumer-shopping-cart'
import { confirmModal$_b } from '@menus/shared-ui'
import type { UserAddress } from '@menus/user-address-common'
import { default_userAddress$_b } from '@menus/consumer-user-address'
import { user_address_ui_Ctx } from './user_address_ui_Ctx'
const key = 'save_default_userAddress'
export const save_default_userAddress_b:B<user_address_ui_Ctx, typeof key> = be_(key, (ctx)=>{
	const confirmModal$ = confirmModal$_b(ctx)
	const default_userAddress$ = default_userAddress$_b(ctx)
	const shopping_cart = shopping_cart_b(ctx)
	const restaurant_cartitems$ = shopping_cart.restaurant_cartitems$
	return save_default_userAddress as save_default_userAddress_T
	async function save_default_userAddress(userAddress:UserAddress) {
		const restaurant_cartitems =
			await subscribe_wait_for_timeout(
				restaurant_cartitems$, neql_(undefined), timeout_ms
			)
		if (restaurant_cartitems.length) {
			const confirm = await confirmModal$.$.open({
				message: MSG_WARN_CHANGE_ADDRESS,
				ok_text: 'Continue',
				cancel_text: 'Cancel',
			})
			if (confirm) {
				await default_userAddress$.save(userAddress)
			}
		} else {
			await default_userAddress$.save(userAddress)
		}
	}
})
export type save_default_userAddress_T = (userAddress:UserAddress)=>Promise<void>
