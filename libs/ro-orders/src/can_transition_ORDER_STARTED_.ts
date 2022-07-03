import type { Order } from '@menus/shared-order'
import { order_is_cancelled_ } from './order_is_cancelled_.js'
import { order_is_declined_ } from './order_is_declined_.js'
export function can_transition_ORDER_STARTED_(order:Order):boolean {
	return !!(
		order.Is_Accepted
		&& !order.Is_Started
		&& !order_is_cancelled_(order)
		&& !order_is_declined_(order)
	)
}
