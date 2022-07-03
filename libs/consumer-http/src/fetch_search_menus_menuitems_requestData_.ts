import { SearchMenuRequestQuery, SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import { search_menus_data_ } from './search_menus_data_.js'
export function fetch_search_menus_menuitems_requestData_(
	requestData:SearchMenuRequestQuery_I = new SearchMenuRequestQuery()
):SearchMenuRequestQuery {
	requestData.qtype = 'menuitems'
	return search_menus_data_(requestData)
}
