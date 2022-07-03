import { SearchDishType, SearchMenuRequestQuery, SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import { search_menus_data_ } from './search_menus_data_.js'
import type { Coordinate_payload_T } from './Coordinate_payload_T.js'
import type { WordType_payload_T } from './WordType_payload_T.js'
export function search_menus_menuname_requestData_(
	requestData:SearchMenuRequestQuery_I = new SearchMenuRequestQuery()
) {
	requestData.qtype = 'menuname'
	return search_menus_data_(requestData)
}
export interface search_menus_menuname_payload_T {
	Table?:SearchDishType[]
	Table1?:SearchDishType[]
	Coordinate:Coordinate_payload_T
	WordType:WordType_payload_T
}
