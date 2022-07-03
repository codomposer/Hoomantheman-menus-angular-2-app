import { pluralize } from './pluralize.js'
export function days_text_(days:number):string {
	return days ? `${days} ${pluralize(days, 'day')}` : ''
}
