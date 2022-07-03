import { SearchMenuRequestQuery, SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import type { DishType_I } from '@menus/dish'
import type { PaginationPayload } from '@menus/api'
import { search_menus_data_ } from './search_menus_data_.js'
export function search_dish_requestData_(requestData:SearchMenuRequestQuery_I = new SearchMenuRequestQuery()) {
	requestData.qtype = 'dish'
	return search_menus_data_(requestData)
}
export interface search_dish_payload_T {
	Data:DishType_I[];
	Pagination:PaginationPayload;
}
