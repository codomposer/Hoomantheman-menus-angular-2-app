import { assign, B, be_ } from '@ctx-core/object'
import { API_KEY, API_URL_ } from '@menus/web-config'
import { consumer_request_url_params__I } from './consumer_request_url__b.js'
import type { http_Ctx } from './http_Ctx.js'
import { request_url_ } from './request_url_.js'
const key = 'shared_request_url_'
export const shared_request_url__b:B<http_Ctx, typeof key> = be_(key, (ctx)=>{
	return shared_request_url_ as shared_request_url__T
	function shared_request_url_(params:consumer_request_url_params__I):string {
		const data = assign({ key: API_KEY }, params.data)
		const request_url = request_url_(
			`${API_URL_(ctx.webConfig)}${params.path}`,
			data
		)
		return request_url
	}
})
export type shared_request_url__T = (params:consumer_request_url_params__I)=>string
