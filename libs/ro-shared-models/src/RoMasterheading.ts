import type { SortDetail } from '@menus/sort-shared'
import type { RoMasterheading_I } from './RoMasterheading_I.js'
import type { RoHeading_I } from './RoHeading_I.js'
export class RoMasterheading implements RoMasterheading_I, SortDetail {
	public ID:number
	public Name:string
	public Description:string
	public Opening_Time:string
	public Closing_Time:string
	public Enabled:boolean
	public IsDiningIn:boolean
	public IsCatering:boolean
	public IsDelivery:boolean
	public IsPickup:boolean
	public SortID:number
	public MasterHeadingName:string
	public Heading:RoHeading_I[]
	//ui
	public hidden:boolean
}
