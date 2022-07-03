import { label_str_ } from './label_str_.js'
export function email_errors_(val:string, label = ''):string[] {
	if (typeof val !== 'number' && !val) return []
	const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return (val && regex.test(val)) ? [] : [`${label_str_(label)}must be a valid email address`]
}
