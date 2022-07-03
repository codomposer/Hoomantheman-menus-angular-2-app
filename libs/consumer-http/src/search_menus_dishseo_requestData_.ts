import { SearchMenuRequestQuery, SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import { search_menus_data_ } from './search_menus_data_.js'
import type { search_menus_menu_payload_T } from './fetch_search_menus_menu_b.js'
export function search_menus_dishseo_requestData_(//region
	requestData:SearchMenuRequestQuery_I = new SearchMenuRequestQuery()
) {
	requestData.qtype = 'dishseo'
	return search_menus_data_(requestData)
}
export interface search_menus_dishseo_payload_T extends search_menus_menu_payload_T {
}
