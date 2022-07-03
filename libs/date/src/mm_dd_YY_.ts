import { getMonth } from './getMonth.js'
import { getDayOfMonth } from './getDayOfMonth.js'
import { getShortYear } from './getShortYear.js'
export function mm_dd_YY_(in_date:Date|string|number = new Date(), join_str = '-'):string {
	const date = new Date(in_date)
	return [
		getMonth(date), getDayOfMonth(date), getShortYear(date)
	].join(join_str)
}
