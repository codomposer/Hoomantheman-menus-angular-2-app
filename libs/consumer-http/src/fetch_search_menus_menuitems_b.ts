import { B, be_ } from '@ctx-core/object'
import { fetch_api_request_b } from '@menus/http'
import { SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import type { Menuitem_I } from '@menus/consumer-menu'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
import { fetch_search_menus_menuitems_request__b } from './fetch_search_menus_menuitems_request__b.js'
const key = 'fetch_search_menus_menuitems'
export const fetch_search_menus_menuitems_b:B<consumer_http_Ctx, typeof key> = be_(key, ctx=>{
	const fetch_api_request = fetch_api_request_b(ctx)
	const fetch_search_menus_menuitems_request_ = fetch_search_menus_menuitems_request__b(ctx)
	return fetch_search_menus_menuitems as fetch_search_menus_menuitems_T
	async function fetch_search_menus_menuitems(requestData:SearchMenuRequestQuery_I) {
		const request = await fetch_search_menus_menuitems_request_(requestData)
		return await fetch_api_request(request) as search_menus_menuitems_payload_T
	}
})
export type fetch_search_menus_menuitems_T = (requestData:SearchMenuRequestQuery_I)=>Promise<search_menus_menuitems_payload_T>
export interface search_menus_menuitems_payload_T {
	Data:Menuitem_I[]
}
