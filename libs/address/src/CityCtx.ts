import type { ZipCtx } from './ZipCtx.js'
export interface CityCtx {
	City:string,
	StateID:number,
	TotalPages:number,
	TotalRow:number,
	ZipInfo:ZipCtx[],
}
