import { isNumber } from '@ctx-core/number'
import { hour_minutes } from './hour_minutes.js'
import { minutes_human_text_ } from './minutes_human_text_.js'
export function minutes_duration_human_text_(min:number, max:number):string {
	if (isNumber(min) && isNumber(max) && min < hour_minutes && max < hour_minutes) {
		return `${min}-${max} minutes`
	}
	const min_human_text = minutes_human_text_(min)
	const max_human_text = minutes_human_text_(max)
	if (min_human_text && max_human_text && min_human_text !== max_human_text) {
		return `${min_human_text}-${max_human_text}`
	}
	return min_human_text || max_human_text || ''
}
