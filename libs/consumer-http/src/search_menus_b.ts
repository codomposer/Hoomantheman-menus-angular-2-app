import { B, be_ } from '@ctx-core/object'
import { SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import { fetch_api_request_b } from '@menus/http'
import type { search_menus_payload_T } from './search_menus_payload_T.js'
import { search_menus_request__b } from './search_menus_request__b.js'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
const key = 'search_menus'
export const search_menus_b:B<consumer_http_Ctx, typeof key> = be_(key, ctx=>{
	const fetch_api_request = fetch_api_request_b(ctx)
	const search_menus_request_ = search_menus_request__b(ctx)
	return search_menus
	async function search_menus(data:SearchMenuRequestQuery_I) {
		return (
			await fetch_api_request(
				await search_menus_request_(data)
			)
		) as search_menus_payload_T
	}
})
export type search_menus_T = (data:SearchMenuRequestQuery_I)=>Promise<search_menus_payload_T>
