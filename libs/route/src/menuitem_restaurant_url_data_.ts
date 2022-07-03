import type { ServiceType } from '@menus/service-type-common'
import { url_slug_ } from '@menus/util'
import type { SearchMenuitem_I } from '@menus/search-menu-common'
import { first_serviceType_ } from '@menus/consumer-menu'
import type { RestaurantUrlData_I } from './RestaurantUrlData_I.js'
export function menuitem_restaurant_url_data_(
	menuitem:SearchMenuitem_I, serviceType?:ServiceType
):RestaurantUrlData_I|undefined {
	if (!menuitem) return
	const { CuisineName, RestaurantName, Address, FFID } = menuitem
	if (!serviceType) {
		serviceType = first_serviceType_(menuitem)
	}
	return {
		serviceType: url_slug_(serviceType),
		cuisine: url_slug_(CuisineName),
		name: `${url_slug_(RestaurantName)}-${url_slug_(Address)}`,
		fireFlyID: url_slug_(FFID),
	} as RestaurantUrlData_I
}
