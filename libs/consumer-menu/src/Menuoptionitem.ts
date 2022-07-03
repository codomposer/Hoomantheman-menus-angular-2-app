import type { SizeDetail } from '@menus/shared-menu'
import type { Menuoptionitem_I } from './Menuoptionitem_I.js'
export class Menuoptionitem implements Menuoptionitem_I {
	public ID:number
	public Name:string
	public Is_Default:boolean
	public Price:number
	public SortID:number
	public Enabled:boolean
	public SizeDetails:SizeDetail[] = []
	public MenuItemOptionID_SubLevel:number
	public SizeRefName:number
	// ui
	public is_selected?:boolean
}
