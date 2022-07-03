import { date_errors_ } from './date_errors_.js'
import { errors__T } from './errors_2.js'
export function date_errors_2(regex:RegExp, message:string):errors__T {
	return (val:string)=>{
		return date_errors_(regex, message, val)
	}
}
