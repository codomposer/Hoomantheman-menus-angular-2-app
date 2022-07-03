import type { Modal_I } from '@menus/modal'
import type { Order } from '@menus/shared-order'
export interface OrderStatusHistoryModal_open_T {
	order:Order
}
export type OrderStatusHistoryModal_close_T = void
export interface OrderStatusHistoryModal_I
	extends Modal_I<OrderStatusHistoryModal_open_T, OrderStatusHistoryModal_close_T> {}
