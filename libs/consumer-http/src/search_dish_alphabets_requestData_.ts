import { SearchMenuRequestQuery, SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import type { PaginationPayload } from '@menus/api'
import { search_menus_data_ } from './search_menus_data_.js'
export function search_dish_alphabets_requestData_(
	requestData:SearchMenuRequestQuery_I = new SearchMenuRequestQuery()
) {
	requestData.qtype = 'dishletterlist'
	return search_menus_data_(requestData)
}
export interface search_dish_alphabets_payload_T {
	Data:any[];
	Pagination:PaginationPayload;
}
