import type { Holiday } from './Holiday.js'
export function Holiday_dateStart_errors_2(list:Holiday[]):Holiday_dateStart_errors__T {
	return (day:Holiday)=>{
		const errors:string[] = []
		if (!day.Date_Start) {
			errors.push(`Value is required`)
		} else if (day.Date_Start === day.Date_End) {
			errors.push(`Value can't be equal to closing time`)
		} else if (day.Date_Start > day.Date_End) {
			errors.push(`Value can't be greater then closing time`)
		}
		for (const item of list) {
			if (day.ID !== item.ID) {
				if (day.Date_Start >= item.Date_Start && day.Date_Start <= item.Date_End) {
					errors.push(`Value is conflicting with other time`)
					break
				}
			}
		}
		return errors
	}
}
export type Holiday_dateStart_errors__T = (day:Holiday)=>string[]
