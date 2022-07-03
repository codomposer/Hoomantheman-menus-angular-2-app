import { isNumber } from '@ctx-core/number'
import { compact } from '@ctx-core/array'
import { hour_minutes } from './hour_minutes.js'
import { minutes_text_ } from './minutes_text_.js'
import { day_minutes } from './day_minutes.js'
import { hours_text_ } from './hours_text_.js'
import { days_text_ } from './days_text_.js'
export function minutes_human_text_(total_minutes:number):string {
	if (total_minutes == null) return ''
	if (!isNumber(total_minutes.toString())) return ''
	if (total_minutes < hour_minutes) {
		return minutes_text_(total_minutes)
	}
	const hours = Math.floor((total_minutes % day_minutes) / hour_minutes)
	const minutes = Math.ceil(total_minutes % hour_minutes)
	const hours_text = hours_text_(hours)
	const minutes_text = minutes_text_(minutes)
	const hours_minutes_text = compact([hours_text, minutes_text]).join(' ')
	if (total_minutes < day_minutes) {
		return hours_minutes_text
	}
	const days = Math.floor(total_minutes / day_minutes)
	const days_hours_minutes_text = compact([days_text_(days), hours_minutes_text]).join(' ')
	return days_hours_minutes_text
}
