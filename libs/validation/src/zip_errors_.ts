import { label_str_ } from './label_str_.js'
export function zip_errors_(val:string, label = ''):string[] {
	if (typeof val !== 'number' && !val) return []
	return (
		/^\d{5}(?:[-\s]\d{4})?$/.test(val)
		? []
		: [`${label_str_(label)}must be a valid zip code`]
	)
}
