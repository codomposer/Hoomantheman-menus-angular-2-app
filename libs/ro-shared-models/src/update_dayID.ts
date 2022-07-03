import type { RestHours } from './RestHours.js'
import { next_dayID_ } from './next_dayID_.js'
export function update_dayID(RestHours:RestHours[]) {
	for (const day of (RestHours || [])) {
		for (const dayDetail of day.DayDetails) {
			dayDetail.dayIDFrom = day.DayID
			if (dayDetail.Opening_Time > dayDetail.Closing_Time) {
				dayDetail.dayIDTo = next_dayID_(day.DayID)
			} else {
				dayDetail.dayIDTo = day.DayID
			}
		}
	}
}
