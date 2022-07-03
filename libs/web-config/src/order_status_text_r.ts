import { order_status_r_StatusID } from './order_status_r_StatusID.js'
export const order_status_text_r = {
	[order_status_r_StatusID.ORDER_PLACED]: 'Order Placed',
	[order_status_r_StatusID.ORDER_CANCELLED_BY_CUSTOMER]: 'Cancelled',
	[order_status_r_StatusID.ORDER_CANCELLED_BY_REST]: 'Cancelled by Restaurant',
	[order_status_r_StatusID.CC_PRE_APPROVED]: 'Approved',
	[order_status_r_StatusID.ORDER_ACCEPTED]: 'Accepted',
	[order_status_r_StatusID.MENUS_AGENT_CALLRESTAURANT_ADD_QUEUE]: 'Added in Queue',
	[order_status_r_StatusID.ORDER_PICKUP]: 'Delivering',
	[order_status_r_StatusID.ORDER_DELIVERED]: 'Delivered',
}
