import { join_url } from '@ctx-core/uri'
import { not_found_goto_url } from './not_found_goto_url.js'
import type { RestaurantUrlData_I } from './RestaurantUrlData_I.js'
export function restaurant_url_(restaurant_url_data:RestaurantUrlData_I):string {
	const { serviceType, cuisine, name, fireFlyID } = restaurant_url_data || {}
	return (
		(serviceType && cuisine && name && fireFlyID)
		? join_url([
			'restaurant',
			serviceType,
			cuisine,
			name,
			fireFlyID,
		]) : not_found_goto_url
	)
}
