import { label_str_ } from './label_str_.js'
export function number_errors_(value:any, label = ''):string[] {
	if (typeof value !== 'number' && !value) return []
	return (
		/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
		? []
		: [`${label_str_(label)}must be a number`]
	)
}
