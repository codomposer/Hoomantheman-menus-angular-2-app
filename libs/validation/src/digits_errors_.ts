import { label_str_ } from './label_str_.js'
export function digits_errors_(value:any, label = ''):string[] {
	if (typeof value !== 'number' && !value) return []
	return (
		/^\d+$/.test(value)
		? []
		: [`${label_str_(label)}must be a digit`]
	)
}
