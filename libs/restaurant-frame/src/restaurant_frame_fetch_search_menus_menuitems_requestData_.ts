import { fetch_search_menus_menuitems_requestData_ } from '@menus/consumer-http'
import { ServiceTypeId } from '@menus/service-type-common'
import { userAddress_coordinate_ } from '@menus/user-address-common'
import { SearchMenuRequestQuery } from '@menus/search-menu-common'
import type { restaurant_frame_sync_T } from './restaurant_frame_sync_T.js'
export function restaurant_frame_fetch_search_menus_menuitems_requestData_(
	restaurant_frame_sync:restaurant_frame_sync_T
):SearchMenuRequestQuery {
	const { fireFlyID, serviceType, userAddress } = restaurant_frame_sync
	const requestData = fetch_search_menus_menuitems_requestData_()
	requestData.restaurantid = 0
	requestData.ff = fireFlyID
	requestData.menuType = ServiceTypeId[serviceType]
	if (userAddress) {
		requestData.coordinate = userAddress_coordinate_(userAddress)
		requestData.proximity = 100
	}
	return requestData
}
