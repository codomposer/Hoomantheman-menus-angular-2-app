import { SearchMenuRequestQuery, SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import { search_menus_data_ } from './search_menus_data_.js'
export function search_menus_servicetype_requestData_(
	requestData:SearchMenuRequestQuery_I = new SearchMenuRequestQuery()
) {
	requestData.qtype = 'servicetype'
	return search_menus_data_(requestData)
}
export interface Item__search_menus_servicetype {
	isExist:boolean
	MenuType:number
}
export interface search_menus_servicetype_payload_T {
	Table:Item__search_menus_servicetype[]
}
