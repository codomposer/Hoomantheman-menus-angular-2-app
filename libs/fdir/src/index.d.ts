type glob_T = string|RegExp
export default (glob:glob_T, options:Object, returnState?:boolean)=>(str:string)=>boolean
export const test:(
	input:string, regex:RegExp, options:Object, { glob, posix }:{ glob?:glob_T, posix?:boolean }
)=>{ isMatch:boolean, output:string, match?:any }
export const matchBase:(input:string, glob:glob_T, options:Object, posix?:boolean)=>boolean
export const isMatch:(str:glob_T, patterns:string|string[], options:Object)=>boolean
interface token_T {
	type:string
	value:string
	output:string
}
interface parse_state_T {
	input:string
	index:number
	start:number
	dot:boolean
	consumed:string
	output:string
	prefix:string
	backtrack:boolean
	negated:boolean
	brackets:number
	braces:number
	parens:number
	quotes:number
	globstar:boolean
	tokens:token_T[]
}
export const parse:(pattern:glob_T, options:Object)=>parse_state_T
interface scan_state_T {
	prefix:string
	input:string
	start:number
	base:string
	glob:string
	isBrace:boolean
	isBracket:boolean
	isGlob:boolean
	isExtglob:boolean
	isGlobstar:boolean
	negated:boolean
	negatedExtglob:boolean
}
export const scan:(input:string, options:Object)=>scan_state_T
export const compileRe:(state:parse_state_T, options:Object, returnOutput?:boolean, returnState?:boolean)=>RegExp
export const makeRe:(input:string, options:Object, returnOutput?:boolean, returnState?:boolean)=>RegExp
export const toRegex:(source:string, options:Object)=>RegExp
export const constants:Record<string, any>
