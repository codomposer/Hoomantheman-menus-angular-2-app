import { shortDate_ } from './short_date_.js'
import { shortTime_ } from './short_time_.js'
export function shortDateTime_(in_date:Date|string|number = new Date()):string {
	if (!in_date) return ''
	const date = new Date(in_date)
	return `${shortDate_(date)} ${shortTime_(date)}`
}
