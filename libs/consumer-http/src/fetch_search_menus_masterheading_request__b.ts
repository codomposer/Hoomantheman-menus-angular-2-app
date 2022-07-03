import { B, be_ } from '@ctx-core/object'
import { APIRequest } from '@menus/api'
import { SearchMenuRequestQuery, SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import { search_menus_data_ } from './search_menus_data_.js'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
import { search_menus_request__b } from './search_menus_request__b.js'
const key = 'fetch_search_menus_masterheading_request_'
export const fetch_search_menus_masterheading_request__b:B<consumer_http_Ctx, typeof key> = be_(key, ctx=>{
	const search_menus_request_ = search_menus_request__b(ctx)
	return async function fetch_search_menus_masterheading_request_(requestData:SearchMenuRequestQuery_I) {
		return search_menus_request_(
			fetch_search_menus_masterheading(requestData)
		)
	}
})
export type fetch_search_menus_masterheading_request__T =
	(requestData:SearchMenuRequestQuery_I)=>Promise<APIRequest>
export function fetch_search_menus_masterheading(requestData:SearchMenuRequestQuery_I = new SearchMenuRequestQuery()) {
	requestData.qtype = 'masterheading'
	return search_menus_data_(requestData)
}
