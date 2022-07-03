import type { Modal_I } from '@menus/modal'
export interface MapCustomerRouteModal_open_T {
	fireFlyID:string
	orderID:number
}
export type MapCustomerRouteModal_close_T = void
export interface MapCustomerRouteModal_I
	extends Modal_I<MapCustomerRouteModal_open_T, MapCustomerRouteModal_close_T> {}
