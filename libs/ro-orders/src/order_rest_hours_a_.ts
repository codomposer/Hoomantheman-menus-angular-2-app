import { Order } from '@menus/shared-order'
import {
	CATERING_SERVICE_TYPE_ID, DELIVERY_SERVICE_TYPE_ID, DINEIN_SERVICE_TYPE_ID, PICKUP_SERVICE_TYPE_ID
} from '@menus/service-type-common'
import type { RestaurantHours_I } from '@menus/restaurant-hours-lib'
import { RestaurantHour_I } from '@menus/restaurant-hours-lib'
export function order_rest_hours_a_(
	order:Order, restaurant_hours:RestaurantHours_I
):RestaurantHour_I[]|undefined {
	const { ServiceTypeID } = order
	return (
		ServiceTypeID === DINEIN_SERVICE_TYPE_ID
		? restaurant_hours.WorkingHours
		: ServiceTypeID === CATERING_SERVICE_TYPE_ID
			? restaurant_hours.CateringHours
			: ServiceTypeID === DELIVERY_SERVICE_TYPE_ID
				? restaurant_hours.DeliveryHours
				: ServiceTypeID === PICKUP_SERVICE_TYPE_ID
					? restaurant_hours.WorkingHours
					: undefined
	)
}
