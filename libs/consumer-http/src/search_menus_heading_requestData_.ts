import { SearchMenuRequestQuery, SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import type { Heading_I } from '@menus/consumer-menu'
import { search_menus_data_ } from './search_menus_data_.js'
export function search_menus_heading_requestData_(
	requestData:SearchMenuRequestQuery_I = new SearchMenuRequestQuery()
) {
	requestData.qtype = 'heading'
	return search_menus_data_(requestData)
}
export type search_menus_heading_payload_T = Heading_I[]
