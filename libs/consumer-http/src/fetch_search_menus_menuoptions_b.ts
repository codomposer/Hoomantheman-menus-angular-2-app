import { B, be_ } from '@ctx-core/object'
import type { SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import { fetch_api_request_b } from '@menus/http'
import type { Menuoption_I } from '@menus/consumer-menu'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
import { fetch_search_menus_menuoptions_request__b } from './fetch_search_menus_menuoptions_request__b.js'
const key = 'fetch_search_menus_menuoptions'
export const fetch_search_menus_menuoptions_b:B<consumer_http_Ctx, typeof key> = be_(key, ctx=>{
	const fetch_api_request = fetch_api_request_b(ctx)
	const fetch_search_menus_menuoptions_request_ = fetch_search_menus_menuoptions_request__b(ctx)
	return fetch_search_menus_menuoptions as fetch_search_menus_menuoptions_T
	async function fetch_search_menus_menuoptions(requestData:SearchMenuRequestQuery_I) {
		return (
			await fetch_api_request(
				await fetch_search_menus_menuoptions_request_(requestData)
			)
		) as search_menus_menuoptions_payload_T
	}
})
export type fetch_search_menus_menuoptions_T =
	(requestData:SearchMenuRequestQuery_I)=>Promise<search_menus_menuoptions_payload_T>
export interface search_menus_menuoptions_payload_T {
	MenuOptions:Menuoption_I[]
}
