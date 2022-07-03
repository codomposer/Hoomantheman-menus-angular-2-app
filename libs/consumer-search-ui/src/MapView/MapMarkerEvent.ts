import type { SearchMenuitem_I } from '@menus/search-menu-common'
export interface MapMarkerEvent extends Event {
	index:number
	item:SearchMenuitem_I
	mapMarker:google.maps.Marker
}
