import type { errors__T } from './errors_2.js'
import { regex_errors_ } from './regex_errors_.js'
export function regex_errors_2(regex:RegExp, message:string):errors__T {
	return (val:string, label?:string)=>{
		return regex_errors_(regex, `${label}${message ? ` ${message}` : ''}`, val)
	}
}
