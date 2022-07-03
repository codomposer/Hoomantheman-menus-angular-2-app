import { Writable$, writable$ } from '@ctx-core/store'
import { BaseModalController } from '@menus/modal'
import type { CartCoupon_I, RestaurantCartitem_I } from '@menus/shopping-cart'
import type { coupon_ui_Ctx } from '../coupon_ui_Ctx.js'
import type {
	AvailableCouponsModal_close_T, AvailableCouponsModal_open_T, AvailableCouponsModal_I
} from './AvailableCouponsModal_I.js'
export class AvailableCouponsModal_c
	extends BaseModalController<AvailableCouponsModal_open_T, AvailableCouponsModal_close_T, coupon_ui_Ctx>
	implements AvailableCouponsModal_I {
	readonly restaurant_cartitem:Writable$<RestaurantCartitem_I> = writable$(null)
	readonly available_coupons:Writable$<CartCoupon_I[]> = writable$([])
	readonly before_open_modal = async (data:AvailableCouponsModal_open_T)=>{
		this.restaurant_cartitem.$ = data.$restaurant_cartitem
		const applied_couponsIDs =
			this.restaurant_cartitem.$.applied_coupons
				.map((c)=>c.CouponID)
		this.available_coupons.$ = this.restaurant_cartitem.$.coupons.filter(
			c=>applied_couponsIDs.indexOf(c.CouponID) === -1
		)
	}
	readonly choose_coupon = async (coupon:CartCoupon_I)=>{
		await this.close({ coupon })
	}
}
