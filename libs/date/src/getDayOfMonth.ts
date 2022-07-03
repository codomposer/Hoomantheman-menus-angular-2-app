import { lPad } from '@ctx-core/string'
export function getDayOfMonth(date) {
	return lPad(date.getDate(), '0', 2)
}
