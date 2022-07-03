import { SearchMenuRequestQuery, SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import type { AutoSuggestList } from '@menus/consumer-user-common'
import { search_menus_data_ } from './search_menus_data_.js'
export function search_menus_autosuggest_requestData_(
	requestData:SearchMenuRequestQuery_I = new SearchMenuRequestQuery()
) {
	requestData.qtype = 'autosuggest'
	return search_menus_data_(requestData)
}
export type search_menus_autosuggest_payload_T = AutoSuggestList
