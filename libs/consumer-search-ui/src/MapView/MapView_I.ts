import type { SearchMenuitem_I } from '@menus/search-menu-common'
export type active_item_T = SearchMenuitem_I
export type active_mapMarker_T = google.maps.Marker
export type map_T = google.maps.Map
export type mapMarkers_T = google.maps.Marker[]
export interface MapView_I {
	active_item:active_item_T
	active_mapMarker:active_mapMarker_T
	map:map_T
	mapMarkers:mapMarkers_T
	set_active(active_item:SearchMenuitem_I, active_mapMarker:google.maps.Marker):Promise<void>
	unset_active_item():void
}
