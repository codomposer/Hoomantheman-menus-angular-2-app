import type { RestaurantHour_I } from '@menus/restaurant-hours-lib'
import { millis_ } from '@menus/date'
import { sanitized_date_ } from './sanitized_date_.js'
export function next_open_time_(
	service_restaurant_hours:RestaurantHour_I[], minute_tick:Date
):Date {
	const minute_tick_millis = millis_(minute_tick)
	return service_restaurant_hours
		.flatMap<Date>(restaurant_hour=>
			restaurant_hour.Time.flatMap<Date>((time)=>{
					const start = sanitized_date_(time.Start_ISO)
					return (minute_tick_millis < millis_(start) ? [start] : []) as Date[]
				}
			)
		)[0]
}
