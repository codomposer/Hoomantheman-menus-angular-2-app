import { email_errors_ } from './email_errors_.js'
import { phone_errors_ } from './phone_errors_.js'
import { label_str_ } from './label_str_.js'
export function email_phone_errors_(val:string, label = ''):string[] {
	if (typeof val !== 'number' && !val) return []
	return (
		email_errors_(val)?.length && phone_errors_(val)?.length
		? [`${label_str_(label)}must be an email or a 10 digit phone number`]
		: []
	)
}
