import type { schedule_n0_T } from '@menus/restaurant-hours-lib'
export function ASAP_available_(schedule_n0_a:schedule_n0_T[], minute_tick:Date):boolean {
	const schedule_time = schedule_n0_a?.[0]?.schedule_n1_a?.[0]
	if (!schedule_time) return false
	const { utc_time } = schedule_time
	return utc_time >= minute_tick
}
