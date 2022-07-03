import type { Holiday } from './Holiday.js'
export function Holiday_dateEnd_errors_2(list:Holiday[]):Holiday_dateEnd_errors__T {
	return (day:Holiday)=>{
		const errors:string[] = []
		if (!day.Date_End) {
			errors.push(`Value is required`)
		} else if (day.Date_Start === day.Date_End) {
			errors.push(`Value can't be equal to opening time`)
		}
		for (const item of list) {
			if (day.ID !== item.ID) {
				if (day.Date_End >= item.Date_Start && day.Date_End <= item.Date_End) {
					errors.push(`Value is conflicting with other time`)
					break
				}
			}
		}
		return errors
	}
}
export type Holiday_dateEnd_errors__T = (day:Holiday)=>string[]
