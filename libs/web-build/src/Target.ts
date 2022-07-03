import type { Options } from 'globby'
export interface Target extends Options {
	src:string
	dest:string
	transform?:(target:Target)=>Promise<string>
}
