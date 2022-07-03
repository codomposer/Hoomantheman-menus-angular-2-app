import type { Modal_I } from '@menus/modal'
import type { Order } from '@menus/shared-order'
export interface ThankYouPointsModal_open_T {
	order:Order
	total_points:number
}
export type ThankYouPointsModal_close_T = MouseEvent
export interface ThankYouPointsModal_I
	extends Modal_I<ThankYouPointsModal_open_T, ThankYouPointsModal_close_T> {}
