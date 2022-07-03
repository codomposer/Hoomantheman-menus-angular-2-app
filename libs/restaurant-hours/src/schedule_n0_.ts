import type { schedule_ctx_I, schedule_n0_T } from '@menus/restaurant-hours-lib'
export function schedule_n0_(schedule_ctx:schedule_ctx_I):void|schedule_n0_T {
	return (schedule_ctx.schedule_n0_a || [])
		.find(schedule_n0=>schedule_n0.value === schedule_ctx.schedule_n0_value)
}
