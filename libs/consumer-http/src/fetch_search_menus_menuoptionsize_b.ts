import { B, be_ } from '@ctx-core/object'
import { fetch_api_request_b } from '@menus/http'
import type { SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import type { Menuoptionsize_I } from '@menus/consumer-menu'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
import { fetch_search_menus_menuoptionsize_request__b } from './fetch_search_menus_menuoptionsize_request__b.js'
const key = 'fetch_search_menus_menuoptionsize'
export const fetch_search_menus_menuoptionsize_b:B<consumer_http_Ctx, typeof key> = be_(key, ctx=>{
	const fetch_api_request = fetch_api_request_b(ctx)
	const fetch_search_menus_menuoptionsize_request_ = fetch_search_menus_menuoptionsize_request__b(ctx)
	return fetch_search_menus_menuoptionsize as fetch_search_menus_menuoptionsize_T
	async function fetch_search_menus_menuoptionsize(requestData:SearchMenuRequestQuery_I) {
		const request = await fetch_search_menus_menuoptionsize_request_(requestData)
		return await fetch_api_request(request) as search_menus_menuoptionsize_payload_T
	}
})
export type fetch_search_menus_menuoptionsize_T =
	(requestData:SearchMenuRequestQuery_I)=>Promise<search_menus_menuoptionsize_payload_T>
export interface search_menus_menuoptionsize_payload_T {
	Data:Menuoptionsize_I[]
}
