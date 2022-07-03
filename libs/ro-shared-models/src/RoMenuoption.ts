import type { RoMenuoption_I } from './RoMenuoption_I.js'
import type { RoMenuoptionitem_I } from './RoMenuoptionitem_I.js'
export class RoMenuoption implements RoMenuoption_I {
	public ID:number
	public Name:string
	public Is_Single_Size:boolean
	public Is_Single_Select = true
	public Minimum_Select:number
	public Maximum_Select:number
	public Is_Quantity_Select:boolean
	public Minimum_Quantity:number
	public Maximum_Quantity:number
	public Enabled:boolean
	public SortID:number
	public OptionID:number
	public OptionHeader:string
	public OptionItems:RoMenuoptionitem_I[] = []
	public selected_OptionItem:RoMenuoptionitem_I
	public SizeRefID:number
	public SizeRefName:string
	public Is_Quantity_Multiplier_Select:boolean
	public Is_Linked:boolean
	public AllText:string
	public Description:string
	public Description_Display:string
	public Is_Deleted:boolean
	public MenuItemID:number
	public Name_Display:string
	public RowID:number
	public Source_ID:number
}
