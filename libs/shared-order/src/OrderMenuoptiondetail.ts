import type { OrderMenuoptiondetail_I } from './OrderMenuoptiondetail_I.js'
export class OrderMenuoptiondetail implements OrderMenuoptiondetail_I {
	SizeID:number
	OptionID:number
	OptionItemID:number
	OptionItemName:string
	Qty:number
	Amount:number
	Total:number
	OptionItem:OrderMenuoptiondetail_I[]
}
