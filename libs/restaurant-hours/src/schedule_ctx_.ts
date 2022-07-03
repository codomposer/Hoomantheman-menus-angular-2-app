import type { param_schedule_ctx_I, schedule_ctx_I } from '@menus/restaurant-hours-lib'
import { ASAP_available_ } from './ASAP_available_.js'
import { restaurant_hour_ctx_a_ } from './restaurant_hour_ctx_a_.js'
import { schedule_n0_a_ } from './schedule_n0_a_.js'
import { schedule_n1_value_ } from './schedule_n1_value_.js'
import { service_restaurant_hours_ } from './service_restaurant_hours_.js'
import { current_day_restaurant_hour_ } from './current_day_restaurant_hour_.js'
import { is_open_ } from './is_open_.js'
export function schedule_ctx_(
	in_schedule_ctx:param_schedule_ctx_I, opts:schedule_ctx__opts_T = {}
):param_schedule_ctx_I|schedule_ctx_I {
	const schedule_ctx = in_schedule_ctx as schedule_ctx_I
	const { minute_tick, serviceType, restaurant_hours, ETAMax } = schedule_ctx
	if (
		!opts.validated
		&& (!minute_tick || !serviceType || !restaurant_hours || !ETAMax)
	) {
		return schedule_ctx
	}
	const service_restaurant_hours = service_restaurant_hours_(restaurant_hours, serviceType)
	schedule_ctx.service_restaurant_hours = service_restaurant_hours
	const is_open = is_open_(service_restaurant_hours, minute_tick)
	schedule_ctx.is_open = is_open
	const current_day_restaurant_hour = current_day_restaurant_hour_(service_restaurant_hours, minute_tick)
	schedule_ctx.current_day_restaurant_hour = current_day_restaurant_hour
	const restaurant_hour_ctx_a = restaurant_hour_ctx_a_(schedule_ctx)
	schedule_ctx.restaurant_hour_ctx_a = restaurant_hour_ctx_a
	const schedule_n0_a = schedule_n0_a_(schedule_ctx)
	schedule_ctx.schedule_n0_a = schedule_n0_a
	const ASAP_available = ASAP_available_(schedule_n0_a, minute_tick)
	schedule_ctx.ASAP_available = ASAP_available
	const schedule_n0_value = schedule_n0_value_()
	schedule_ctx.schedule_n0_value = schedule_n0_value
	const schedule_n1_value = schedule_n1_value_(schedule_ctx)
	schedule_ctx.schedule_n1_value = schedule_n1_value
	return schedule_ctx
	function schedule_n0_value_():string {
		let schedule_n0_value = schedule_ctx.schedule_n0_value || schedule_n0_a?.[0]?.value
		return schedule_n0_value
	}
}
export interface schedule_ctx__opts_T {
	validated?:boolean
}
