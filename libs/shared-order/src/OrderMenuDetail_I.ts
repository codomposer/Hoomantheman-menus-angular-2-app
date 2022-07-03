import type { SoldOutAction } from '@menus/user-common'
import type { OrderMenuoptiondetail } from './OrderMenuoptiondetail.js'
export interface OrderMenuDetail_I {
	ID:number
	OrderID:number
	ItemID:number
	SizeID:number
	ItemName:string
	Qty:number
	Price:number
	Amount:number
	SizeName:string
	Instructions:string
	OptionData_Display:string
	CustomerRating:any
	CustomerComment:string
	SoldOutAction:SoldOutAction
	OptionDetails:OrderMenuoptiondetail[]
}
