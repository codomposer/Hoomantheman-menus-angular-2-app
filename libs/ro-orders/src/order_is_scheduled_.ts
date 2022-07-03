import type { Order } from '@menus/shared-order'
import { order_is_cancelled_ } from './order_is_cancelled_.js'
export function order_is_scheduled_(order:Order):boolean {
	return !!(
		order.Is_Scheduled
		&& !order.Is_Started
		&& !order_is_cancelled_(order)
	)
}
