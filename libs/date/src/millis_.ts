import { now_ } from './now_.js'
export function millis_(in_date:Date|string|number = now_()):number {
	return new Date(in_date).getTime()
}
