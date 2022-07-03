import { I } from '@ctx-core/combinators'
import { isArray } from '@ctx-core/object'
import type { validation_errors_T, validation_T } from './validation.js'
import type { ValidationMessages } from './ValidationMessages/index.js'
export function errors_2(validation_args:validation_args_T):errors__T {
	let label:string, validations:validation_T[]
	if (isArray(validation_args)) {
		label = (validation_args as validation_args_array_T)[0]
		validations = (validation_args as validation_args_array_T).slice(1)
	} else {
		const args_object = validation_args as validation_args_object_T
		label = args_object?.label
		validations = args_object?.validations
	}
	return (value:any, in_label = label)=>{
		return (validations || []).map(validation=>
			typeof validation === 'function'
			? (validation(value, in_label) as validation_errors_T)
			: [validation as validation_errors_T].flat() as validation_errors_T
		).flat().filter(I) as string[]
	}
}
export type errors__T = (value:any, label?:string)=>string[]
export type validation_args_array_T = [string, ...validation_T[]]
export interface validation_args_object_T {
	label?:string
	validationMessages?:ValidationMessages
	validations:validation_T[]
	noinit?:boolean
}
export type validation_args_T = validation_args_array_T|validation_args_object_T
