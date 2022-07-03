import type { Modal_I } from '@menus/modal'
import type { Order } from '@menus/shared-order'
export interface WriteReviewModal_open_T {
	order:Order
}
export interface WriteReviewModal_close_T {
	total_points:number
}
export interface WriteReviewModal_I
	extends Modal_I<WriteReviewModal_open_T, WriteReviewModal_close_T> {}
