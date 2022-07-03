import type { SelectItem } from '@menus/form'
import type { SizeDetail } from '@menus/shared-menu'
import type { SortDetail } from '@menus/sort-shared'
export interface Menuoptionitem_I extends Menuoptionitem_ui_I, SelectItem, SortDetail {
	ID:number
	Name:string
	Is_Default:boolean
	Price:number
	SortID:number
	Enabled:boolean
	SizeDetails:SizeDetail[]
	MenuItemOptionID_SubLevel:number
	SizeRefName:number
}
export interface Menuoptionitem_ui_I {
	is_selected?:boolean
}
