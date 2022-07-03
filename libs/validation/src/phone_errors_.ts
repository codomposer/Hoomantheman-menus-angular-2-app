import { label_str_ } from './label_str_.js'
export function phone_errors_(val:string, label = ''):string[] {
	if (typeof val !== 'number' && !val) return []
	return (
		/^[0-9\-\+]{10,10}$/.test(val)
		? []
		: [`${label_str_(label)}must be 10 digits only`]
	)
}
