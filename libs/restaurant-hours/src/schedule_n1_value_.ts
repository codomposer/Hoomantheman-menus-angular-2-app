import type { schedule_n1_T, schedule_ctx_I } from '@menus/restaurant-hours-lib'
import { schedule_n0_ } from './schedule_n0_.js'
import { schedule_n1_ } from './schedule_n1_.js'
export function schedule_n1_value_(schedule_ctx:schedule_ctx_I):string {
	const {
		schedule_n1_value: previous_schedule_n1_value,
	} = schedule_ctx
	let schedule_n1_value = previous_schedule_n1_value
	const schedule_n0 = schedule_n0_(schedule_ctx)
	const previous_schedule_n0 = schedule_n0_(schedule_ctx)
	if (previous_schedule_n0 && schedule_n0) {
		const schedule_n1 = schedule_n1_(schedule_ctx) as schedule_n1_T
		schedule_n1_value = schedule_n1?.value
	}
	return schedule_n1_value
}
