import type { ServiceType } from '@menus/service-type-common'
import type { RestaurantHours_I } from './RestaurantHours_I.js'
export interface param_schedule_ctx_I {
	serviceType:ServiceType
	minute_tick:Date
	restaurant_hours:RestaurantHours_I
	ETAMax:number
}
