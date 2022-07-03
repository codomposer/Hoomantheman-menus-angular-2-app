import { last_ } from '@ctx-core/array'
import type { RestaurantHour_I } from '@menus/restaurant-hours-lib'
import { offset_date_ } from './offset_date_.js'
import { sanitized_date_ } from './sanitized_date_.js'
export function current_day_restaurant_hour_(
	service_restaurant_hours:RestaurantHour_I[], minute_tick:Date
):RestaurantHour_I {
	if (!service_restaurant_hours || !minute_tick) return
	return service_restaurant_hours.find(restaurant_hour=>{
		const first_Time = restaurant_hour.Time[0]
		const last_Time = last_(restaurant_hour.Time)
		if (!first_Time) return
		const { Start_ISO } = first_Time
		const { End_ISO } = last_Time
		const minute_tick_contained_in_working_hours =
			minute_tick >= sanitized_date_(Start_ISO)
			&& minute_tick <= sanitized_date_(End_ISO)
		if (minute_tick_contained_in_working_hours) return true
		const { TzOffsetMilliSeconds } = first_Time
		const first_Time_start = offset_date_(first_Time.Start_ISO, TzOffsetMilliSeconds)
		const local_utc_minute_tick = offset_date_(minute_tick, TzOffsetMilliSeconds)
		return first_Time_start.getUTCDate() === local_utc_minute_tick.getUTCDate()
	})
}
