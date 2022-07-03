import { label_str_ } from './label_str_.js'
export function password_errors_(val:string, label = ''):string[] {
	if (typeof val !== 'number' && !val) return []
	return (
		/^[0-9a-zA-Z]{8,}$/.test(val)
		? []
		: [`${label_str_(label)}must be at least 8 digits Alpha numeric`]
	)
}
