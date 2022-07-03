import { Order } from '@menus/shared-order'
import type { RestaurantHour_I, RestaurantHours_I } from '@menus/restaurant-hours-lib'
import { order_rest_hours_a_ } from './order_rest_hours_a_.js'
import { is_business_day_ } from './is_business_day_.js'
export function business_rest_hours_(
	restaurant_hours:RestaurantHours_I,
	order:Order,
	millis:number
):RestaurantHour_I|undefined {
	const rest_hours_a = order_rest_hours_a_(order, restaurant_hours)
	for (const rest_hours of rest_hours_a) {
		if (is_business_day_(rest_hours, millis)) {
			return rest_hours
		}
	}
}
