import { SearchMenuRequestQuery, SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import { search_menus_data_ } from './search_menus_data_.js'
export function search_rest_alphabets_requestData_(
	requestData:SearchMenuRequestQuery_I = new SearchMenuRequestQuery()
) {
	requestData.qtype = 'menuletterlist'
	return search_menus_data_(requestData)
}
export interface search_rest_alphabets_payload_T {
}
