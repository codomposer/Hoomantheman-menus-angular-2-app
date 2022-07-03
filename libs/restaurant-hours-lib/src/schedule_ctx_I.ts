import type { RestaurantHour_I, RestaurantHourCtx_I } from './RestaurantHours_I.js'
import type { schedule_n0_T } from './schedule_n0_T.js'
import type { param_schedule_ctx_I } from './param_schedule_ctx_I.js'
export interface schedule_ctx_I extends param_schedule_ctx_I {
	is_open:boolean
	service_restaurant_hours:RestaurantHour_I[]
	current_day_restaurant_hour:RestaurantHour_I
	restaurant_hour_ctx_a:RestaurantHourCtx_I[]
	ASAP_available:boolean
	schedule_n0_a:schedule_n0_T[]
	schedule_n0_value:string
	schedule_n1_value:string
}
