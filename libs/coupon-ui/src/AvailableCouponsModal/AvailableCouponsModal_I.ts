import type { Modal_I } from '@menus/modal'
import type { CartCoupon_I, RestaurantCartitem_I } from '@menus/shopping-cart'
export interface AvailableCouponsModal_open_T {
	$restaurant_cartitem:RestaurantCartitem_I
}
export interface AvailableCouponsModal_close_T {
	coupon:CartCoupon_I
}
export interface AvailableCouponsModal_I extends Modal_I<AvailableCouponsModal_open_T, AvailableCouponsModal_close_T> {
}
