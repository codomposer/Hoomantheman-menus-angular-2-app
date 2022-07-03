import { clone } from '@ctx-core/object'
import type { RestaurantHourCtx_I, schedule_ctx_I } from '@menus/restaurant-hours-lib'
import { schedule_n1_a_ } from './schedule_n1_a_.js'
import { offset_date_ } from './offset_date_.js'
export function restaurant_hour_ctx_a_(schedule_ctx:schedule_ctx_I):RestaurantHourCtx_I[] {
	const { minute_tick, service_restaurant_hours } = schedule_ctx
	return (
		(service_restaurant_hours || [])
			.map(restaurant_hour=>{
				const schedule_n1_a = schedule_n1_a_(restaurant_hour, schedule_ctx)
				const { TzOffsetMilliSeconds: offset_ms } = restaurant_hour.Time[0]
				const local_minute_tick = offset_date_(minute_tick, offset_ms)
				return clone(restaurant_hour, {
					local_minute_tick,
					schedule_n1_a,
				} as RestaurantHourCtx_I) as RestaurantHourCtx_I
			})
			.filter(ui_restaurant_hour_ctx=>ui_restaurant_hour_ctx.schedule_n1_a.length)
	)
}
