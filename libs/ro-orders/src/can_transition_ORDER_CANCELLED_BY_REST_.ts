import type { Order } from '@menus/shared-order'
import { is_DeliveryMode_DELIVERY_COMPANY_ } from '@menus/web-config'
import { order_is_cancelled_ } from './order_is_cancelled_.js'
import { order_is_declined_ } from './order_is_declined_.js'
export function can_transition_ORDER_CANCELLED_BY_REST_(order:Order):boolean {
	return !!(
		!order_is_cancelled_(order)
		&& (
			is_DeliveryMode_DELIVERY_COMPANY_(order.DeliveryModeID)
			? !order.Is_Accepted
			: !order.Is_Completed
		)
		&& !order_is_declined_(order)
	)
}
