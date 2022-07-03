import { B, be_ } from '@ctx-core/object'
import { SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import { APIRequest } from '@menus/api'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
import { search_menus_request__b } from './search_menus_request__b.js'
import { fetch_search_menus_menuoptions_requestData_ } from './fetch_search_menus_menuoptions_requestData_.js'
const key = 'fetch_search_menus_menuoptions_request_'
export const fetch_search_menus_menuoptions_request__b:B<consumer_http_Ctx, typeof key> = be_(key, ctx=>{
	const search_menus_request_ = search_menus_request__b(ctx)
	return fetch_search_menus_menuoptions_request_
	function fetch_search_menus_menuoptions_request_(requestData:SearchMenuRequestQuery_I) {
		return search_menus_request_(
			fetch_search_menus_menuoptions_requestData_(requestData)
		)
	}
})
export type fetch_search_menus_menuoptions_request__T = (requestData:SearchMenuRequestQuery_I)=>Promise<APIRequest>
