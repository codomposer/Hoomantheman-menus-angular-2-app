import { B, be_ } from '@ctx-core/object'
import type { PaginationPayload } from '@menus/api'
import { fetch_api_request_b } from '@menus/http'
import { SearchMenuitem_I, SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
import type { Coordinate_payload_T } from './Coordinate_payload_T.js'
import { fetch_search_menus_menu_request__b } from './fetch_search_menus_menu_request__b.js'
import type { WordType_payload_T } from './WordType_payload_T.js'
const key = 'fetch_search_menus_menu'
export const fetch_search_menus_menu_b:B<consumer_http_Ctx, typeof key> = be_(key, ctx=>{
	const fetch_api_request = fetch_api_request_b(ctx)
	const fetch_search_menus_menu_request_ = fetch_search_menus_menu_request__b(ctx)
	return fetch_search_menus_menu as fetch_search_menus_menu_T
	async function fetch_search_menus_menu(data:SearchMenuRequestQuery_I) {
		const request = await fetch_search_menus_menu_request_(data)
		return await fetch_api_request(request) as search_menus_menu_payload_T
	}
})
export type fetch_search_menus_menu_T = (data:SearchMenuRequestQuery_I)=>Promise<search_menus_menu_payload_T>
export interface search_menus_menu_payload_T {
	Data:SearchMenuitem_I[]
	Coordinate:Coordinate_payload_T
	WordType:WordType_payload_T
	Pagination:PaginationPayload
}
