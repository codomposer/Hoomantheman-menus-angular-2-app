import type { nullish } from '@ctx-core/function'
import { ServiceType } from '@menus/service-type-common'
import { isDeliverable_ } from '@menus/service-type'
import { RoRestaurant_I } from './RoRestaurant_I.js'
import type { restaurant_time_minutes_o_T } from './restaurant_time_minutes_o_T.js'
export function restaurant_time_minutes_o_(
	serviceType:ServiceType|nullish, ro_restaurant:RoRestaurant_I|nullish
):restaurant_time_minutes_o_T {
	if (!serviceType || !ro_restaurant) return
	const { min_time, max_time } =
		isDeliverable_(serviceType)
		? {
				min_time: ro_restaurant.DeliveryTime_Min,
				max_time: ro_restaurant.DeliveryTime_Max,
			}
		: {
				min_time: ro_restaurant.PickupTime_Min,
				max_time: ro_restaurant.PickupTime_Max,
			}
	const mid_time = Math.ceil(min_time + (max_time - min_time) / 2.0)
	return { min_time, mid_time, max_time }
}
