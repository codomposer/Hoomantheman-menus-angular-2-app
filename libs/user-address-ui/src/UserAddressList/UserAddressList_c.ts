import { I } from '@ctx-core/combinators'
import { subscribe_wait_timeout, Writable$, writable$ } from '@ctx-core/store'
import { BaseController, confirmModal$_b } from '@menus/shared-ui'
import { UserAddress, userAddress_a$_b } from '@menus/consumer-user-address'
import { UserAddressAPIRequestQuery } from '@menus/consumer-user-common'
import { log } from '@menus/util'
import { consumer_http_client_b } from '@menus/consumer-http'
import { notyf_success_b } from '@menus/notyf'
import { shopping_cart_b } from '@menus/consumer-shopping-cart'
import { timeout_ms } from '@menus/web-config'
import type { ChangeAddressModal_I } from '../ChangeAddressModal/index.js'
import type { user_address_ui_Ctx } from '../user_address_ui_Ctx.js'
const Controller_name = 'UserAddressList_c'
export class UserAddressList_c extends BaseController<user_address_ui_Ctx> {
	readonly shopping_cart = shopping_cart_b(this.ctx)
	readonly confirmModal$ = confirmModal$_b(this.ctx)
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly userAddress_a$ = userAddress_a$_b(this.ctx)
	readonly action_busy$ = writable$<boolean>(false)
	readonly ChangeAddressModal_i$:Writable$<ChangeAddressModal_I> = writable$(null)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly edit_userAddress = async (userAddress:UserAddress)=>{
		log(this.ctx, Controller_name, 'openAddNewAddressModal')
		await subscribe_wait_timeout(this.ChangeAddressModal_i$, I, timeout_ms)
		await this.ChangeAddressModal_i$.$.open({ userAddress, })
		log(this.ctx, Controller_name, 'openAddNewAddressModal')
	}
	readonly delete_userAddress = async (userAddress_idx:number, userAddress:UserAddress)=>{
		const confirm = await this.confirmModal$.$.open({
			message: `Are you sure you want to delete ${userAddress.Address}?`,
		})
		if (confirm) {
			await this.delete2_userAddress(userAddress_idx, userAddress)
		}
	}
	private readonly delete2_userAddress = async (userAddress_idx:number, userAddress:UserAddress)=>{
		this.action_busy$.$ = true
		try {
			const requestData = new UserAddressAPIRequestQuery()
			requestData.a = userAddress.ID
			const payload = await this.consumer_http_client.delete_userAddress(requestData)
			if (payload.Code === 'DELETE_DELIVERY_ADDRESS') {
				(this.userAddress_a$.$ as UserAddress[]).splice(userAddress_idx, 1)
				this.userAddress_a$.refresh()
				this.notyf_success('Successfully deleted delivery address.')
			}
		} finally {
			this.action_busy$.$ = false
		}
	}
}
