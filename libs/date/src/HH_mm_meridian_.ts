import { short_hours_str_ } from './short_hours_str_.js'
import { minutes_str_ } from './minutes_str_.js'
import { meridian_ } from './meridian_.js'
export function HH_mm_meridian_(in_date:Date|string|number = new Date()):string {
	const date = new Date(in_date)
	return `${short_hours_str_(date.getHours())}:${minutes_str_(date.getMinutes())}${meridian_(date.getHours())}`
}
