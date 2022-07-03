import type { SearchMenuitem_I } from '@menus/search-menu-common'
export interface Heading_I extends Heading_ui_I {
	Mhid:number
	MasterHeading:string
	Hid:number
	Heading:string
	ItemCount:number
	Menus_SourceID:number
}
export interface Heading_ui_I {
	menuitems:SearchMenuitem_I[]
	element:HTMLElement
}
