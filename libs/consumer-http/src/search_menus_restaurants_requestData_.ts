import { SearchMenuRequestQuery, SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import { search_menus_data_ } from './search_menus_data_.js'
export function search_menus_restaurants_requestData_(
	requestData:SearchMenuRequestQuery_I = new SearchMenuRequestQuery()
) {
	requestData.qtype = 'restaurants'
	return search_menus_data_(requestData)
}
export interface search_menus_restaurants_payload_T {
	Data:any[]
}
