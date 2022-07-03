import type { RoHeading_I } from './RoHeading_I.js'
export interface RoMasterheading_I extends RoMasterheading_ui_I {
	ID:number
	Name:string
	Description:string
	Opening_Time:string
	Closing_Time:string
	Enabled:boolean
	IsDiningIn:boolean
	IsCatering:boolean
	IsDelivery:boolean
	IsPickup:boolean
	SortID:number
	MasterHeadingName:string
	Heading:RoHeading_I[]
}
export interface RoMasterheading_ui_I {
	hidden:boolean
}
