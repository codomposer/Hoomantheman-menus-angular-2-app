import type { ExtendedGeolocatable_I } from '@menus/geolocatable'
import type { SearchMenuitem_I } from '@menus/search-menu-common'
export interface Menuitem_I extends Menuitem_ui_I, SearchMenuitem_I, ExtendedGeolocatable_I {}
export interface Menuitem_ui_I {
	isOpen:boolean
	sub_menuitems:Menuitem_I[]
	mapInfoWindow:any
}
