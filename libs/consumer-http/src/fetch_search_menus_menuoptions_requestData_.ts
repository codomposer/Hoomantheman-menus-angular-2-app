import { SearchMenuRequestQuery, SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import { search_menus_data_ } from './search_menus_data_.js'
export function fetch_search_menus_menuoptions_requestData_(
	requestData:SearchMenuRequestQuery_I = new SearchMenuRequestQuery()
) {
	requestData.qtype = 'menuoptions'
	requestData.option = 0
	return search_menus_data_(requestData)
}
