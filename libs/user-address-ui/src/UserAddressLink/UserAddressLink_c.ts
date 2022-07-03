import { neq_ } from '@ctx-core/function'
import { subscribe_wait_for_timeout, Writable$, writable$ } from '@ctx-core/store'
import { MSG_WARN_CHANGE_ADDRESS, timeout_ms } from '@menus/web-config'
import { userAddress$_b } from '@menus/consumer-user-address'
import { BaseController, confirmModal$_b } from '@menus/shared-ui'
import { shopping_cart_b } from '@menus/consumer-shopping-cart'
import { open_modal_b } from '@menus/modal'
import type { ChangeAddressModal_T } from '../ChangeAddressModal'
import type { user_address_ui_Ctx } from '../user_address_ui_Ctx.js'
const Controller_name = 'UserAddressLink_c'
export class UserAddressLink_c extends BaseController<user_address_ui_Ctx> {
	readonly ChangeAddressModal_i:Writable$<ChangeAddressModal_T> = writable$<ChangeAddressModal_T>(null)
	readonly confirmModal$ = confirmModal$_b(this.ctx)
	readonly open_modal = open_modal_b(this.ctx)
	readonly shopping_cart = shopping_cart_b(this.ctx)
	readonly restaurant_cartitems$ = this.shopping_cart.restaurant_cartitems$
	readonly userAddress$ = userAddress$_b(this.ctx)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly open_ChangeAddressModal_i = async ()=>{
		if (this.restaurant_cartitems$.$?.length) {
			const confirm = await this.confirmModal$.$.open({
				message: MSG_WARN_CHANGE_ADDRESS,
				ok_text: 'Continue',
				cancel_text: 'Cancel',
			})
			if (confirm) {
				await this.step2_open_ChangeAddressModal_i()
			}
		} else {
			await this.step2_open_ChangeAddressModal_i()
		}
	}
	private readonly step2_open_ChangeAddressModal_i = async ()=>{
		await subscribe_wait_for_timeout(this.ChangeAddressModal_i, neq_(null), timeout_ms)
		await this.open_modal(this.ChangeAddressModal_i.$, {
			userAddress: this.userAddress$.$,
		})
	}
}
