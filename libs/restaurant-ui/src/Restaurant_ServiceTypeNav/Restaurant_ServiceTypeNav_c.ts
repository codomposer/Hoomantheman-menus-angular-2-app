import { derived$, Readable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import type { ServiceType } from '@menus/service-type-common'
import { log } from '@menus/util'
import { restaurant_url_ } from '@menus/route'
import { navigating_goto_b, params_serviceType$_b } from '@menus/page'
import { shopping_cart_b } from '@menus/consumer-shopping-cart'
import { confirmModal$_b } from '@menus/shared-ui'
import { RestaurantFrame_I, restaurant_frame$_b } from '@menus/restaurant-frame'
import { serviceType$_b } from '@menus/service-type'
import type { restaurant_ui_Ctx } from '../restaurant_ui_Ctx.js'
const Controller_name = 'Restaurant_ServiceTypeNav_c'
export class Restaurant_ServiceTypeNav_c extends BaseController<restaurant_ui_Ctx> {
	readonly shopping_cart = shopping_cart_b(this.ctx)
	readonly restaurant_cartitems$ = this.shopping_cart.restaurant_cartitems$
	readonly confirmModal$ = confirmModal$_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly params_serviceType$ = params_serviceType$_b(this.ctx)
	readonly restaurant_frame$ = restaurant_frame$_b(this.ctx)
	readonly serviceType$ = serviceType$_b(this.ctx)
	readonly cuisine$:Readable$<string> = derived$(this.restaurant_frame$,//region
		(restaurant_frame)=>{
			return (restaurant_frame as RestaurantFrame_I)?.cuisine
		}
	)//endregion
	readonly fireFlyID$:Readable$<string> = derived$(this.restaurant_frame$,//region
		(restaurant_frame)=>{
			return (restaurant_frame as RestaurantFrame_I)?.fireFlyID
		}
	)//endregion
	readonly name$:Readable$<string> = derived$(this.restaurant_frame$,//region
		(restaurant_frame)=>{
			return (restaurant_frame as RestaurantFrame_I)?.name
		}
	)//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly click_serviceType = async (tab_serviceType:ServiceType)=>{
		log(this.ctx, Controller_name, 'click_serviceType', tab_serviceType)
		if (tab_serviceType !== this.params_serviceType$.$) {
			if (
				!this.restaurant_cartitems$.$?.length
				|| (
					await this.confirmModal$.$.open({
						message: 'If you change your service type, then all your shopping cart items will be removed.',
						ok_text: 'Update',
						cancel_text: 'Cancel',
						cancel_class: 'btn-gray',
					})
				)
			) {
				// serviceType is optimistically set to fix race condition
				this.serviceType$.$ = tab_serviceType
				await this.navigating_goto(
					restaurant_url_({
						serviceType: tab_serviceType,
						cuisine: this.cuisine$.$,
						name: this.name$.$,
						fireFlyID: this.fireFlyID$.$,
					}))
				return
			}
		}
	}
}
