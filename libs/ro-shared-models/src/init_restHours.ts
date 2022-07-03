import type { RestHours } from './RestHours.js'
import { add_restHour } from './add_restHour.js'
import { update_dayID } from './update_dayID.js'
export function init_restHours(restHours:RestHours[]) {
	for (const day of (restHours || [])) {
		day.DayDetails = day.DayDetails || []
		if (day.DayDetails.length === 0) {
			add_restHour(0, day)
		}
	}
	update_dayID(restHours)
}
