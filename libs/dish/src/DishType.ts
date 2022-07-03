import type { DishType_I } from './DishType_I.js'
export class DishType implements DishType_I {
	// API Fields
	public id:number
	public DishName:string
	public Count:number
	public RestCount:number
	public FileName:string
	public ImageExist:boolean
	public TotalPages:number
	public TotalRow:number
	public active:boolean
}
