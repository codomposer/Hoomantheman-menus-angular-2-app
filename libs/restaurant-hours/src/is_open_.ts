import type { RestaurantHour_I } from '@menus/restaurant-hours-lib'
import { sanitized_date_ } from './sanitized_date_.js'
export function is_open_(
	service_restaurant_hours:RestaurantHour_I[], minute_tick:Date
):boolean {
	for (const restaurant_hour of service_restaurant_hours || []) {
		const { Time } = restaurant_hour
		for (const time of Time) {
			const start = sanitized_date_(time.Start_ISO)
			const end = sanitized_date_(time.End_ISO)
			if (minute_tick >= start && minute_tick <= end) return true
		}
	}
	return false
}
