import type { Menuoptionitem_I } from './Menuoptionitem_I.js'
export interface Menuoption_I extends Menuoption_ui_I {
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
	OptionDescription:string
	OptionItems:Menuoptionitem_I[]
	Menus_SourceID:number
	Is_Linked:boolean
	Is_Quantity_Multiplier_Select:boolean
}
export interface Menuoption_ui_I {
	selected_OptionItem:Menuoptionitem_I
}
