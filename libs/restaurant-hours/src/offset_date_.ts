import { millis_ } from '@menus/date'
import { sanitized_date_ } from './sanitized_date_.js'
export function offset_date_(in_date:Date|string|number, offset_ms:number):Date {
	return sanitized_date_(apply_offset(new Date(in_date), offset_ms))
}
function apply_offset(date:Date, offset_ms:number):Date {
	date.setTime(millis_(date) + offset_ms)
	return date
}
