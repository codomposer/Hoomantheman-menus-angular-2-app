import { lPad } from '@ctx-core/string'
export function short_hours_str_(hours:number):string {
	return lPad(((hours % 12) || 12).toString(), '0', 2)
}
