import type { SearchMenuitem_I } from '@menus/search-menu-common'
import type { Heading_I } from './Heading_I.js'
export interface Masterheading_I extends Masterheading_ui_I {
	Mhid:number
	ItemCount:number
	MasterHeading:string
	Menus_SourceID:number
	heads:Heading_I[]
}
export interface Masterheading_ui_I {
	menuitems:SearchMenuitem_I[]
}
