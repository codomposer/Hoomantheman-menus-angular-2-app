import type { SortDetail } from '@menus/sort-shared'
import type { RoMenuoptionitem_I } from './RoMenuoptionitem_I.js'
export interface RoMenuoption_I extends RoMenuoption_ui_I, SortDetail {
	ID:number
	Name:string
	Is_Single_Size:boolean
	Is_Single_Select:boolean
	Minimum_Select:number
	Maximum_Select:number
	Is_Quantity_Select:boolean
	Minimum_Quantity:number
	Maximum_Quantity:number
	Enabled:boolean
	SortID:number
	OptionID:number
	OptionHeader:string
	OptionItems:RoMenuoptionitem_I[]
	SizeRefID:number
	SizeRefName:string
	Is_Quantity_Multiplier_Select:boolean
	Is_Linked:boolean
	selected_OptionItem:RoMenuoptionitem_I
	AllText:string
	Description:string
	Description_Display:string
	Is_Deleted:boolean
	MenuItemID:number
	Name_Display:string
	RowID:number
	Source_ID:number
}
export interface RoMenuoption_ui_I {
	errors?:string[]
	Name_errors?:string[]
}
