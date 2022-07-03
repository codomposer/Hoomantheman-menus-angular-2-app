import { SearchMenuRequestQuery, SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import { search_menus_data_ } from './search_menus_data_.js'
export function search_menus_menu_requestData_(
	data:SearchMenuRequestQuery_I = new SearchMenuRequestQuery()
) {
	data.qtype = 'menu'
	return search_menus_data_(data)
}
