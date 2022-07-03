import { SearchMenuRequestQuery, SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import type { RestaurantDeliveryFee } from '@menus/restaurant'
import { search_menus_data_ } from './search_menus_data_.js'
export function search_menus_deliveryfee_requestData_(
	requestData:SearchMenuRequestQuery_I = new SearchMenuRequestQuery()
) {
	requestData.qtype = 'deliveryfee'
	return search_menus_data_(requestData)
}
export type search_menus_deliveryfee_payload_T = RestaurantDeliveryFee[]
