import type { Order } from '@menus/shared-order'
import { order_is_cancelled_ } from './order_is_cancelled_.js'
export function can_print_order_(order:Order):boolean {
	return !!(
		order.Is_Accepted
		&& !order_is_cancelled_(order)
	)
}
