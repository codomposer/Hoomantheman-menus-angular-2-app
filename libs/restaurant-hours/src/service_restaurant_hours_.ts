import type { RestaurantHour_I, RestaurantHours_I } from '@menus/restaurant-hours-lib'
import { SERVICE_TYPE_CATERING, SERVICE_TYPE_DELIVERY, ServiceType } from '@menus/service-type-common'
export function service_restaurant_hours_(
	restaurant_hours:RestaurantHours_I, serviceType:ServiceType
):RestaurantHour_I[]|undefined {
	if (!restaurant_hours) return
	return (
		serviceType === SERVICE_TYPE_DELIVERY
		? restaurant_hours.DeliveryHours
		: serviceType === SERVICE_TYPE_CATERING
			? restaurant_hours.CateringHours
			: restaurant_hours.WorkingHours
	)
}
