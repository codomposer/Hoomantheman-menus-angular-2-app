export interface ValidationErrorMessageConfig {
	label?:string
	max?:number
	lt?:number|string
	lte?:number|string
	min?:number
	gt?:number|string
	gte?:number|string
	equal?:string
	getCustomMessage?:(error)=>string
}
