import type { Menuitem_I } from '@menus/consumer-menu'
import type { SoldOutAction } from '@menus/consumer-user-common'
import type { OrderMenuoptiondetail_I } from '@menus/shared-order'
import type { RoMenuitem_I } from './RoMenuitem_I.js'
import type { RoOrderMenuItemDetail_I } from './RoOrderMenuItemDetail_I.js'
export class RoOrderMenuItemDetail implements RoOrderMenuItemDetail_I {
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
	OptionDetails:OrderMenuoptiondetail_I[]
	// ui
	ro_menuitem:RoMenuitem_I
	cr_menuitem:Menuitem_I
	shouldDelete:boolean
}
