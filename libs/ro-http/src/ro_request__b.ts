import { has_dom } from '@ctx-core/dom'
import { B, be_ } from '@ctx-core/object'
import { APIRequest } from '@menus/api'
import { fill_login_user_b } from './fill_login_user_b.js'
import type { SendRequestOptions } from './ro_fetch_b.js'
import { ro_fetch_url__b } from './ro_fetch_url__b.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
const key = 'ro_request_'
export const ro_request__b:B<ro_http_Ctx, typeof key> = be_(key, ctx=>{
	const fill_login_user = fill_login_user_b(ctx)
	const ro_fetch_url_ = ro_fetch_url__b(ctx)
	return request_ as ro_request__T
	async function request_(options:SendRequestOptions) {
		const request = new APIRequest()
		const { requestData } = options
		if (
			has_dom
			&& !options.ignoreLogin
			&& (
				!requestData?.authcode
				|| !requestData?.uid
			)
		) {
			await fill_login_user(requestData)
		}
		request.url = (options.url_ || ro_fetch_url_)(options, requestData)
		request.method = options.requestMethod || 'GET'
		if (options.body) request.body = options.body
		return request
	}
})
export type ro_request__T = (options:SendRequestOptions)=>Promise<APIRequest>
