import type { RestaurantCartitem_I } from '@menus/shopping-cart'
import type { place_order_error_T } from './place_order_error_T.js'
export interface place_order_payload_result_T {
	AddedCustomerPoints:number
	place_order_error?:place_order_error_T
	place_order_success?:RestaurantCartitem_I
	pay_order_error?:place_order_error_T
	pay_order_success?:RestaurantCartitem_I
}
