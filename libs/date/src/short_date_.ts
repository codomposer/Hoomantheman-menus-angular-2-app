import { getMonth } from './getMonth.js'
import { getDayOfMonth } from './getDayOfMonth.js'
import { getShortYear } from './getShortYear.js'
export function shortDate_(date_:Date|string|number = new Date()):string {
	const date = new Date(date_)
	return `${getMonth(date)}/${getDayOfMonth(date)}/${getShortYear(date)}`
}
