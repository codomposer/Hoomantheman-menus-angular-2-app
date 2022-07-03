import type { SearchMenuitem_I } from '@menus/search-menu-common'
import type { Modal_I } from '@menus/modal'
export interface MapRouteModal_open_T {
	restaurant:SearchMenuitem_I
}
export type MapRouteModal_close_T = MouseEvent
export interface MapRouteModal_I extends Modal_I<MapRouteModal_open_T, MapRouteModal_close_T> {
}
