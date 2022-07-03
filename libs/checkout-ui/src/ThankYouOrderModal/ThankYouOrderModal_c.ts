import { derived$, Readable$, writable$, Writable$ } from '@ctx-core/store'
import { BaseModalController } from '@menus/modal'
import type { RestaurantCartitem_I } from '@menus/shopping-cart'
import type { checkout_ui_Ctx } from '../checkout_ui_Ctx.js'
import type { place_order_error_T } from '../place_order_error_T'
import type {
	ThankYouOrderModal_close_T, ThankYouOrderModal_open_T, ThankYouOrderModal_I
} from './ThankYouOrderModal_I'
const Controller_name = 'ThankYouOrderModal_c.js'
export class ThankYouOrderModal_c
	extends BaseModalController<ThankYouOrderModal_open_T, ThankYouOrderModal_close_T, checkout_ui_Ctx>
	implements ThankYouOrderModal_I {
	readonly data$:Writable$<ThankYouOrderModal_open_T> = writable$(null)
	readonly place_order_errors$:Readable$<place_order_error_T[]> = derived$(this.data$,//region
		data=>data?.place_order_errors
	)//endregion
	readonly pay_order_errors$:Readable$<place_order_error_T[]> = derived$(this.data$,//region
		data=>data?.pay_order_errors
	)//endregion
	readonly pay_order_successes$:Readable$<RestaurantCartitem_I[]> = derived$(this.data$,//region
		data=>data?.pay_order_successes
	)//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly before_open_modal = async (data:ThankYouOrderModal_open_T)=>{
		this.data$.$ = data
	}
}
