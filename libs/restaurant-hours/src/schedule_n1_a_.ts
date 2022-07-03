import { last_ } from '@ctx-core/array'
import { minute_milliseconds } from '@ctx-core/time'
import { millis_, UTC_HH_mm_meridian_ } from '@menus/date'
import type { RestaurantHour_I, schedule_n1_T, schedule_ctx_I } from '@menus/restaurant-hours-lib'
import { sanitized_date_, increment_minutes } from './sanitized_date_.js'
import { offset_date_ } from './offset_date_.js'
export function schedule_n1_a_(
	restaurant_hour:RestaurantHour_I, schedule_ctx:schedule_ctx_I
):schedule_n1_T[] {
	const { Time } = restaurant_hour
	if (!Time.length) return []
	const { ETAMax, is_open } = schedule_ctx
	const ETAMax_milliseconds = ETAMax * minute_milliseconds
	const minute_tick = schedule_ctx.minute_tick
	const open_time = sanitized_date_(Time[0].Start_ISO)
	const close_time = sanitized_date_(last_(Time).End_ISO)
	const before_open_time = millis_(open_time) >= millis_(minute_tick)
	const ETAMax_open_time = offset_date_(open_time, ETAMax_milliseconds)
	const same_day_prep = millis_(ETAMax_open_time) <= millis_(close_time)
	const ETAMax_$minute_tick = offset_date_(minute_tick, ETAMax_milliseconds)
	const before_endofday_availability = millis_(close_time) >= millis_(ETAMax_$minute_tick)
	const gte_date =
		before_open_time
		? same_day_prep
			? ETAMax_open_time
			: is_open
				? ETAMax_$minute_tick
				: open_time
		: before_endofday_availability
			? ETAMax_$minute_tick
			: null
	if (!gte_date) {
		return []
	}
	return (
		Time
			.filter(time=>millis_(time.End_ISO) >= millis_(gte_date))
			.map(time=>{
				const { TzOffsetMilliSeconds } = time
				let current_date =
					millis_(gte_date) > millis_(time.Start_ISO)
					? offset_date_(gte_date, TzOffsetMilliSeconds)
					: offset_date_(time.Start_ISO, TzOffsetMilliSeconds)
				const time_end_date = offset_date_(time.End_ISO, TzOffsetMilliSeconds)
				const current_schedule_n1_a:schedule_n1_T[] = []
				while (millis_(current_date) <= millis_(time_end_date)) {
					const local_next_date = next_increment_minutes(current_date)
					const utc_time = offset_date_(current_date, -TzOffsetMilliSeconds)
					current_schedule_n1_a.push({
						value: utc_time.toISOString(),
						utc_time,
						text: UTC_HH_mm_meridian_(current_date)
					} as schedule_n1_T)
					current_date = local_next_date
				}
				return current_schedule_n1_a
			})
			.flat()
	)
}
function next_increment_minutes(in_date:Date|string|number) {
	const date = sanitized_date_(in_date)
	date.setMinutes(date.getMinutes() + increment_minutes)
	return date
}
