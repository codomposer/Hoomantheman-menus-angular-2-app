import type { API_error_T } from '@menus/api'
import type { RestaurantCartitem_I } from '@menus/shopping-cart'
export interface place_order_error_T {
	payload:API_error_T
	restaurant_cartitem:RestaurantCartitem_I
}
