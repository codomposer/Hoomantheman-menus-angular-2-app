import type { SortDetail } from '@menus/sort-shared'
import type { RoMenuitemHeading_I } from './RoMenuitemHeading_I.js'
export interface RoHeading_I extends RoHeading_ui_I, SortDetail {
	ID:number
	Name:string
	Description:string
	Enabled:boolean
	HeadingName:string
	Menu:RoMenuitemHeading_I[]
}
export interface RoHeading_ui_I {
	hidden:boolean
	SortID?:number
}
