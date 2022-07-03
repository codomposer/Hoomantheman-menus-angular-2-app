import type { Order } from '@menus/shared-order'
export function order_is_started_(order:Order):boolean {
	return !!(
		order.Is_Started
		&& !order.Is_Ready
	)
}
