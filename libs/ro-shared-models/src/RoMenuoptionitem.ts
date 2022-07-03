import type { Menuoptionitem_I } from '@menus/consumer-menu'
import type { SizeDetail } from '@menus/shared-menu'
import type { RoMenuoptionitem_I } from './RoMenuoptionitem_I.js'
export class RoMenuoptionitem implements RoMenuoptionitem_I {
	public ID:number
	public Name:string
	public Is_Default:boolean
	public Price:number
	public SortID:number
	public Enabled:boolean
	public SizeDetails:SizeDetail[] = []
	public SizeRefName:string
	public MenuItemOptionID_SubLevel:number
	// ui
	public is_selected?:boolean
	public undo?:Menuoptionitem_I
	public edit_mode?:boolean
	public Name_errors?:string[] = []
	public Price_errors?:string[] = []
}
