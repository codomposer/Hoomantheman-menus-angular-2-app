import { minute_milliseconds } from '@ctx-core/time'
import { minutes_human_text_ } from '@menus/date'
import type { AvailabilityCtx } from '@menus/restaurant'
import type { RestaurantHour_I } from '@menus/restaurant-hours-lib'
import { is_open_ } from './is_open_.js'
import { next_open_time_ } from './next_opening_.js'
export function availability_ctx_(
	service_restaurant_hours:RestaurantHour_I[], minute_tick:Date
):AvailabilityCtx {
	if (!service_restaurant_hours) return {
		is_open: false,
		label: '',
	}
	if (is_open_(service_restaurant_hours, minute_tick)) {
		return {
			is_open: true,
			label: 'Open Now',
		}
	}
	const next_open_time = next_open_time_(service_restaurant_hours, minute_tick)
	if (!next_open_time) {
		return {
			is_open: false,
			label: 'Closed for today',
		}
	}
	const diff = next_open_time.getTime() - minute_tick.getTime()
	return {
		is_open: false,
		label: `Opens in: ${minutes_human_text_(diff / minute_milliseconds)}`,
	}
}
