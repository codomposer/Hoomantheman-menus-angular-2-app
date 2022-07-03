import { label_str_ } from './label_str_.js'
export function required_errors_(val:any, label = ''):string[] {
	return (
		(typeof val === 'number')
		|| (typeof val === 'boolean')
		|| val
		? []
		: [`${label_str_(label)}is required`]
	)
}
