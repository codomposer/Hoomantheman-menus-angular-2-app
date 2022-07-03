import { minute_milliseconds } from '@ctx-core/time'
import { millis_, medium_month_a } from '@menus/date'
import { schedule_ctx_I, schedule_n0_T, Today_label } from '@menus/restaurant-hours-lib'
import { availability_ctx_ } from './availability_ctx_.js'
import { sanitized_date_ } from './sanitized_date_.js'
import { offset_date_ } from './offset_date_.js'
export function schedule_n0_a_(schedule_ctx:schedule_ctx_I,):schedule_n0_T[] {
	const { restaurant_hour_ctx_a, minute_tick, ETAMax } = schedule_ctx
	const availability_ctx = availability_ctx_(schedule_ctx.restaurant_hour_ctx_a, minute_tick)
	const show_asap =
		availability_ctx.is_open
		&& (
			millis_(offset_date_(minute_tick, ETAMax * minute_milliseconds))
			<= millis_(restaurant_hour_ctx_a?.[0]?.Time?.[0].End_ISO)
		)
	const schedule_n0_a = show_asap ? [{
		value: '',
		text: 'ASAP',
		schedule_n1_a: [],
	}] : []
	schedule_n0_a.push(
		...restaurant_hour_ctx_a.map((restaurant_hour_ctx, idx)=>{
			const { DayID, DayName, local_minute_tick, schedule_n1_a, Time } = restaurant_hour_ctx
			const Time_i0 = Time[0]
			const { Start_ISO, TzOffsetMilliSeconds } = Time_i0
			const start_local_UTC_date = sanitized_date_(Start_ISO)
			start_local_UTC_date.setTime(start_local_UTC_date.getTime() + TzOffsetMilliSeconds)
			return {
				value: Start_ISO,
				text:
					(idx === 0 && DayID === DayToDayID(local_minute_tick.getUTCDay()))
					? Today_label
					: DayID === next_DayToDayID(local_minute_tick.getUTCDay())
						? 'Tomorrow'
						: `${DayName}—${medium_month_a[start_local_UTC_date.getUTCMonth()]}${start_local_UTC_date.getUTCDate()}`,
				schedule_n1_a,
			} as schedule_n0_T
		})
	)
	return schedule_n0_a
}
function DayToDayID(Day:number) {
	return Day % 7
}
function next_DayToDayID(Day:number) {
	return (DayToDayID(Day)) % 7 + 1
}
