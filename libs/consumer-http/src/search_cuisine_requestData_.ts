import { SearchMenuRequestQuery, SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import type { Cuisine } from '@menus/cuisine'
import { search_menus_data_ } from './search_menus_data_.js'
export function search_cuisine_requestData_(
	requestData:SearchMenuRequestQuery_I = new SearchMenuRequestQuery()
) {
	requestData.qtype = 'cuisine'
	return search_menus_data_(requestData)
}
export interface search_cuisine_payload_T {
	Data:Cuisine[];
}
