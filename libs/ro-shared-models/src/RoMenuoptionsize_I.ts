import type { SelectItem } from '@menus/form'
import type { SortDetail } from '@menus/sort-shared'
export interface RoMenuoptionsize_I extends SelectItem, SortDetail {
	ID:number
	Name:string
	Description:string
	Price:number
	Is_Default:boolean
	Enabled:boolean
	SortID:number
	MenuItemOptionName_SubLevel:string
	// ui
	undo?:RoMenuoptionsize_I
	previous_Is_Default_ro_menuoptionsize?:RoMenuoptionsize_I
	is_selected?:boolean
	api_errors?:string[]
	api_errors_Name?:string
	Name_errors?:string[]
	Price_errors?:string[]
}
