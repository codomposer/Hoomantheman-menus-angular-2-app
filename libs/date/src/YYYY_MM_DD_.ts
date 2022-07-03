import { getFullYear } from './getFullYear.js'
import { getMonth } from './getMonth.js'
import { getDayOfMonth } from './getDayOfMonth.js'
export function YYYY_MM_DD_(in_date:Date|string|number = new Date(), join_str = '-'):string {
	const date = new Date(in_date)
	return [
		getFullYear(date), getMonth(date), getDayOfMonth(date)
	].join(join_str)
}
