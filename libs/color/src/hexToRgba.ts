import { hexToRgb } from './hexToRgb.js'
export function hexToRgba(hex, a):string {
	return `rgba(${hexToRgb(hex).join(',')},${a})`
}
