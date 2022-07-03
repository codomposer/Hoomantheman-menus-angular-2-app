import { BaseController } from '@menus/shared-ui-lib'
import { neq_, neql_ } from '@ctx-core/function'
import { derived$, Readable$, subscribe_wait_timeout } from '@ctx-core/store'
import { timeout_ms } from '@menus/web-config'
import { restaurant_frame$_b, RestaurantFrame_I } from '@menus/restaurant-frame'
import { I } from '@ctx-core/combinators'
import type { SearchMenuitem_I } from '@menus/search-menu-common'
import { log } from '@menus/util'
import { ChangeAddressModal_i$_b } from '@menus/user-address-ui'
import { userAddress$_b } from '@menus/consumer-user-address'
import { open_modal_b } from '@menus/modal'
import { restaurant_ui_Ctx } from '../restaurant_ui_Ctx.js'
import { set_selected_menuitem_ } from '../set_selected_menuitem_.js'
import { page_query$_b } from '@ctx-core/sapper'
import { Menuitem_I } from '@menus/consumer-menu'
const Controller_name = 'Restaurant_c'
export class Restaurant_c extends BaseController<restaurant_ui_Ctx> {
	readonly page_query$ = page_query$_b(this.ctx)
	readonly set_selected_menuitem = set_selected_menuitem_(this.ctx)
	readonly ChangeAddressModal_i$ = ChangeAddressModal_i$_b(this.ctx)
	readonly open_modal = open_modal_b(this.ctx)
	readonly restaurant_frame$ = restaurant_frame$_b(this.ctx)
	readonly userAddress$ = userAddress$_b(this.ctx)
	readonly isDeliverable$:Readable$<boolean> = derived$(this.restaurant_frame$,//region
		restaurant_frame=>{
			return restaurant_frame.isDeliverable
		}
	)
	readonly menu$:Readable$<SearchMenuitem_I> = derived$(this.restaurant_frame$,//region
		(restaurant_frame:RestaurantFrame_I)=>{
			return restaurant_frame?.menu
		}
	)//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		const isDeliverable = await subscribe_wait_timeout(this.isDeliverable$, neq_(null), timeout_ms)
		if (isDeliverable) {
			const userAddress = await subscribe_wait_timeout(this.userAddress$, neql_(undefined), timeout_ms)
			if (!userAddress) {
				await this.open_ChangeAddressModal_i()
			}
		}

		const { menuitemid } = this.page_query$.$;

		if(menuitemid) {
			const menuItem = this.restaurant_frame$.menuitems$.$.find(m => m.MenuItemID === Number(menuitemid));

			if(menuItem) {
				this.set_selected_menuitem(menuItem as Menuitem_I);
			}
		}
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly open_ChangeAddressModal_i = async ()=>{
		const userAddress = this.userAddress$.$
		const ChangeAddressModal_i = await subscribe_wait_timeout(this.ChangeAddressModal_i$, I, timeout_ms)
		await this.open_modal(ChangeAddressModal_i, { userAddress })
		log(this.ctx, Controller_name, 'open_ChangeAddressModal_i')
	}
}
