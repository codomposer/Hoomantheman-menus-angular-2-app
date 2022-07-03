import { B, be_ } from '@ctx-core/object'
import { APIRequest } from '@menus/api'
import { api_fetch_b } from './api_fetch_b.js'
import { consumer_request_url__b } from './consumer_request_url__b.js'
import type { http_Ctx } from './http_Ctx.js'
import type { RefreshAuthTokenRequestQuery } from './RefreshAuthTokenRequestQuery.js'
const key = 'refresh_auth_token'
export const refresh_auth_token_b:B<http_Ctx, typeof key> = be_(key, ctx=>{
	const api_fetch = api_fetch_b(ctx)
	const consumer_request_url_ = consumer_request_url__b(ctx)
	return refresh_auth_token
	async function refresh_auth_token(data:RefreshAuthTokenRequestQuery) {
		const response = await api_fetch(
			await refresh_auth_token_request_(data)
		)
		return await response.json() as refresh_auth_token_success_payload_T|refresh_auth_token_error_payload_T
	}
	async function refresh_auth_token_request_(data:RefreshAuthTokenRequestQuery) {
		const request = new APIRequest()
		request.url = await consumer_request_url_({ path: '/b/du.aspx', data })
		request.method = 'GET'
		return request
	}
})
export type refresh_auth_token_T =
	(data:RefreshAuthTokenRequestQuery)=>
		Promise<refresh_auth_token_success_payload_T|refresh_auth_token_error_payload_T>
export interface refresh_auth_token_payload_T {
	Code:string
	Data:string // authCode
}
export interface refresh_auth_token_success_payload_T extends refresh_auth_token_payload_T {
	Code:'success'
}
export interface refresh_auth_token_error_payload_T extends refresh_auth_token_payload_T {
	Code:'error'
}
