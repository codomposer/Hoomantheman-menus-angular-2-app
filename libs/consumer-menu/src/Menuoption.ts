import type { Menuoptionitem } from './Menuoptionitem.js'
import type { Menuoption_I } from './Menuoption_I.js'
export class Menuoption implements Menuoption_I {
	public ID:number
	public Name:string
	public OptionDescription:string
	public Is_Single_Size:boolean
	public Is_Single_Select = true
	public Is_Quantity_Select:boolean
	public Minimum_Select:number
	public Maximum_Select:number
	public Minimum_Quantity:number
	public Maximum_Quantity:number
	public Enabled:boolean
	public SortID:number
	public OptionID:number
	public OptionHeader:string
	public OptionItems:Menuoptionitem[] = []
	public selected_OptionItem:Menuoptionitem
	public Menus_SourceID:number
	public Is_Linked:boolean
	public Is_Quantity_Multiplier_Select:boolean
}
