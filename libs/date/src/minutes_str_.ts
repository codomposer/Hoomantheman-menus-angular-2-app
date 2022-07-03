import { lPad } from '@ctx-core/string'
export function minutes_str_(minutes:number):string {
	return lPad(minutes.toString(), '0', 2)
}
