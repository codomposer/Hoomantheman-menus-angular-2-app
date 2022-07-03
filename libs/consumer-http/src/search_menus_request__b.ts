import { B, be_ } from '@ctx-core/object'
import { consumer_request_url__b } from '@menus/http'
import { SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import { APIRequest } from '@menus/api'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
import { search_menus_data_ } from './search_menus_data_.js'
const key = 'search_menus_request_'
export const search_menus_request__b:B<consumer_http_Ctx, typeof key> = be_(key, ctx=>{
	const consumer_request_url_ = consumer_request_url__b(ctx)
	return search_menus_request_
	async function search_menus_request_(data:SearchMenuRequestQuery_I) {
		const request = new APIRequest()
		request.url = await consumer_request_url_({
			path: '/search_menus.aspx',
			data: search_menus_data_(data),
			pcpk: data.pcpk,
		})
		request.method = 'GET'
		return request
	}
})
export type search_menus_request__T = (data:SearchMenuRequestQuery_I)=>Promise<APIRequest>
