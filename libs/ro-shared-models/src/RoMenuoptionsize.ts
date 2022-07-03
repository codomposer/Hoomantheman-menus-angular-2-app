import type { RoMenuoptionsize_I } from './RoMenuoptionsize_I.js'
export class RoMenuoptionsize implements RoMenuoptionsize_I {
	public ID:number
	public Name:string
	public Description:string
	public Price:number
	public Is_Default:boolean
	public Enabled:boolean
	public SortID:number
	public MenuItemOptionName_SubLevel:string
	// ui
	public edit_mode?:boolean
	public undo:RoMenuoptionsize_I
	public previous_Is_Default_ro_menuoptionsize:RoMenuoptionsize_I
	public is_selected?:boolean
	public api_errors = []
	public api_errors_Name:string
	public Name_errors = []
	public Price_errors = []
}
