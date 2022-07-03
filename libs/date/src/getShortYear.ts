import { getFullYear } from './getFullYear.js'
export function getShortYear(date:Date):string {
	return getFullYear(date).toString().slice(2)
}
