import type { Modal_I } from '@menus/modal'
import type { restaurant_cartitems_T } from '@menus/shopping-cart'
import type { place_order_error_T } from '../place_order_error_T'
export interface ThankYouOrderModal_open_T {
	pay_order_successes:restaurant_cartitems_T,
	place_order_errors:place_order_error_T[],
	pay_order_errors:place_order_error_T[],
}
export type ThankYouOrderModal_close_T = void
export interface ThankYouOrderModal_I
	extends Modal_I<ThankYouOrderModal_open_T, ThankYouOrderModal_close_T> {}
