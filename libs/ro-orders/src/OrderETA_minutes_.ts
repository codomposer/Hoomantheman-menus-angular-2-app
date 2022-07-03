import type { Order } from '@menus/shared-order'
import { millis_, millis_minutes_, now_ } from '@menus/date'
export function OrderETA_minutes_(order:Order, date = now_()):number {
	const OrderETA_minutes = millis_minutes_(millis_(order.OrderETA))
	const date_minutes = millis_minutes_(millis_(date))
	return OrderETA_minutes - date_minutes
}
