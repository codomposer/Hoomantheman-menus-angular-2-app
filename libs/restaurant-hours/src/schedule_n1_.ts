import type { schedule_ctx_I, schedule_n1_T, schedule_n0_T } from '@menus/restaurant-hours-lib'
import { schedule_n0_ } from './schedule_n0_.js'
import { sanitized_date_ } from './sanitized_date_.js'
export function schedule_n1_(schedule_ctx:schedule_ctx_I):void|schedule_n1_T {
	const schedule_n0 = schedule_n0_(schedule_ctx)
	const schedule_n1_a = (schedule_n0 as schedule_n0_T)?.schedule_n1_a
	const { schedule_n1_value } = schedule_ctx
	const schedule_n1_value_time = schedule_n1_value && sanitized_date_(schedule_n1_value)
	return (
		schedule_n1_value_time
		&& (schedule_n1_a || []).find(
			schedule_n1=>{
				return schedule_n1.utc_time.getUTCHours() === schedule_n1_value_time.getUTCHours()
					&& schedule_n1.utc_time.getUTCMinutes() === schedule_n1_value_time.getUTCMinutes()
			}
		)
	) || (schedule_n1_a || [])[0]
}
