import { BaseModalController } from '@menus/modal'
import type { select_userAddress_evt_T } from '../UserAddressList'
import { save_default_userAddress_b } from '../save_default_userAddress_b.js'
import type {
	UserAddressListModal_I, UserAddressListModal_close_T, UserAddressListModal_open_T
} from './UserAddressListModal_I.js'
import type { user_address_ui_Ctx } from '../user_address_ui_Ctx.js'
export class UserAddressListModal_c
	extends BaseModalController<UserAddressListModal_open_T, UserAddressListModal_close_T, user_address_ui_Ctx>
	implements UserAddressListModal_I {
	readonly save_default_userAddress = save_default_userAddress_b(this.ctx)
	readonly on_select_userAddress = async (evt:select_userAddress_evt_T)=>{
		const { userAddress } = evt.detail
		await this.close()
		await this.save_default_userAddress(userAddress)
	}
}
