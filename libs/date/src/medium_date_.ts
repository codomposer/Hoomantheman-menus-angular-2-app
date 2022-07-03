import { getDayOfMonth } from './getDayOfMonth.js'
import { getShortYear } from './getShortYear.js'
export const medium_month_a = Object.freeze(
	['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',]
)
export function mediumDate_(date_:Date|string|number = new Date()):string {
	const date = new Date(date_)
	return `${medium_month_a[date.getMonth()]} ${getDayOfMonth(date)}, ${getShortYear(date)}`
}
