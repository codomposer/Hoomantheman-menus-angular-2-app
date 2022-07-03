import { B, be_ } from '@ctx-core/object'
import type { APIRequestQuery } from '@menus/api'
import { request_url_ } from '@menus/http'
import { RO_API_URL_, API_KEY } from '@menus/web-config'
import type { SendRequestOptions } from './ro_fetch_b.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
const key = 'ro_fetch_url_'
export const ro_fetch_url__b:B<ro_http_Ctx, typeof key> = be_(key, ctx=>{
	return ro_fetch_url_
	function ro_fetch_url_(options:SendRequestOptions, data?:APIRequestQuery) {
		return request_url_(
			`${RO_API_URL_(ctx.webConfig)}/${options.apiURL}?key=${API_KEY}`,
			data || options.requestData
		)
	}
})
export type ro_fetch_url__T = (options:SendRequestOptions, data?:APIRequestQuery)=>string
