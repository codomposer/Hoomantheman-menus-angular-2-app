import { EMPTY_TIME } from '@menus/web-config'
import type { HourDayDetails } from './HourDayDetails.js'
import type { RestHours } from './RestHours.js'
export function DayDetails_Closing_Time_errors_2(list:RestHours[]):DayDetails_Closing_Time_errors__T {
	return (DayDetails:HourDayDetails)=>{
		const errors:string[] = []
		if (!DayDetails) return errors
		const { Opening_Time } = DayDetails
		if (
			Opening_Time
			&& Opening_Time !== EMPTY_TIME
			&& Opening_Time === DayDetails.Closing_Time
		) {
			errors.push(`Value can't be equal to opening time`)
		}
		const DayDetailsClosing = `${DayDetails.dayIDTo}:${DayDetails.Closing_Time}`
		for (const currDay of list) {
			for (const currDay_DayDetails of currDay.DayDetails) {
				if (DayDetails.ID !== currDay_DayDetails.ID) {
					const currDay_DayDetails_Opening_Time = currDay_DayDetails.Opening_Time
					const currDay_Opening_str = `${currDay_DayDetails.dayIDFrom}:${currDay_DayDetails_Opening_Time}`
					const currDay_Closing_str = `${currDay_DayDetails.dayIDTo}:${currDay_DayDetails.Closing_Time}`
					if (DayDetailsClosing >= currDay_Opening_str && DayDetailsClosing <= currDay_Closing_str) {
						errors.push(
							`Value is conflicting with other time ${currDay_DayDetails_Opening_Time} - ${currDay_DayDetails.Closing_Time}`
						)
					}
				}
			}
		}
		return errors
	}
}
export type DayDetails_Closing_Time_errors__T = (DayDetails:HourDayDetails)=>string[]
export type DayDetails_Closing_Time_errors_2 = (list:RestHours[])=>DayDetails_Closing_Time_errors__T
