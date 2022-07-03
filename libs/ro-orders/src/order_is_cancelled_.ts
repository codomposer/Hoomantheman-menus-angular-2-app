import { Order } from '@menus/shared-order'
export function order_is_cancelled_(order:Order):boolean {
	return !!(
		order.Is_Cancelled_By_Customer
		|| order.Is_Cancelled_By_DeliveryCompany
		|| order.Is_Cancelled_By_Restaurant
	)
}
