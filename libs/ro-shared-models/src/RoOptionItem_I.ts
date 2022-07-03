import type { SortDetail } from '@menus/sort-shared'
import type { RoSizeDetail } from './RoSizeDetail.js'
export interface RoMenuoptionitem_I extends SortDetail {
	ID:number;
	Name:string;
	Is_Default:boolean;
	Price:number;
	SortID:number;
	Enabled:boolean;
	SizeDetails:RoSizeDetail[];
	// ui
	is_selected?:boolean;
	undo?:RoMenuoptionitem_I;
	edit_mode?:boolean;
	Name_errors?:string[]
	Price_errors?:string[]
}
