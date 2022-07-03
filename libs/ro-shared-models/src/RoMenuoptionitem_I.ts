import type { Menuoptionitem_I } from '@menus/consumer-menu'
import type { SizeDetail } from '@menus/shared-menu'
export interface RoMenuoptionitem_I extends RoMenuoptionitem_ui_I {
	ID:number
	Name:string
	Is_Default:boolean
	Price:number
	SortID:number
	Enabled:boolean
	SizeDetails:SizeDetail[]
	SizeRefName:string
	MenuItemOptionID_SubLevel:number
}
export interface RoMenuoptionitem_ui_I {
	is_selected?:boolean
	undo?:Menuoptionitem_I
	edit_mode?:boolean
	Name_errors?:string[]
	Price_errors?:string[]
}
