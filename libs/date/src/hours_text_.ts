import { pluralize } from './pluralize.js'
export function hours_text_(hours:number):string {
	const ceil_hours = Math.ceil(hours)
	return hours ? `${ceil_hours} ${pluralize(ceil_hours, 'hour')}` : ''
}
