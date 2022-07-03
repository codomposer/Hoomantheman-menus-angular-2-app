import { EMPTY_TIME } from '@menus/web-config'
import type { RestHours } from './RestHours.js'
export function add_restHour(beforeIndex:number, hours:RestHours, edit_mode?:boolean):void {
	hours.DayDetails = hours.DayDetails || []
	hours.DayDetails.splice(beforeIndex + 1, 0, {
		ID: 0,
		Enabled: false,
		Opening_Time: EMPTY_TIME,
		Closing_Time: EMPTY_TIME,
		edit_mode: edit_mode || false,
		dayIDFrom: hours.DayID,
		dayIDTo: hours.DayID
	})
}
