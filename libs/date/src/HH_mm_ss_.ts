import { short_hours_str_ } from './short_hours_str_.js'
import { minutes_str_ } from './minutes_str_.js'
import { getSeconds } from './getSeconds.js'
export function HH_mm_ss_(date_:Date|string|number = new Date()):string {
	const date = new Date(date_)
	return `${short_hours_str_(date.getHours())}:${minutes_str_(date.getMinutes())}:${getSeconds(date)}`
}
