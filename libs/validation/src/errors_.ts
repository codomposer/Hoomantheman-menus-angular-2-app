import { errors_2, validation_args_T } from './errors_2.js'
export function errors_(args:validation_args_T, value:any):string[] {
	return errors_2(args)(value)
}
