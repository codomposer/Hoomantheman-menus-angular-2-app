import { ServiceType } from '@menus/service-type-common'
import type { SearchMenuitem_I } from '@menus/search-menu-common'
export function first_serviceType_(menuitem:SearchMenuitem_I) {
	if (menuitem.isDelivery) {
		return ServiceType.SERVICE_TYPE_DELIVERY
	} else if (menuitem.isPickup) {
		return ServiceType.SERVICE_TYPE_PICKUP
	} else if (menuitem.isCatering) {
		return ServiceType.SERVICE_TYPE_CATERING
	} else if (menuitem.isDiningIn) {
		return ServiceType.SERVICE_TYPE_DINEIN
	}
	return null
}
