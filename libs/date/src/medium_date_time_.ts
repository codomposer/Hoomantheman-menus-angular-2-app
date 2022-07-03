import { mediumDate_ } from './medium_date_.js'
import { mediumTime_ } from './medium_time_.js'
export function mediumDateTime_(in_date:Date|string|number = new Date()):string {
	const date = new Date(in_date)
	return `${mediumDate_(date)} ${mediumTime_(date)}`
}
