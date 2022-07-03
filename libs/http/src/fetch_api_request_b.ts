import { be_ } from '@ctx-core/object'
import type { APIRequest_I } from '@menus/api'
import { auth_code_expired$_b, ro_auth_code_expired$_b } from '@menus/auth'
import { consumer_login_user$_b } from '@menus/consumer-user-common'
import { STATUS_ERROR } from '@menus/web-config'
import { api_fetch_b } from './api_fetch_b.js'
import type { http_Ctx } from './http_Ctx.js'
import { refresh_auth_token_b, refresh_auth_token_payload_T } from './refresh_auth_token_b.js'
import { RefreshAuthTokenRequestQuery } from './RefreshAuthTokenRequestQuery.js'
const key = 'fetch_api_request'
export function fetch_api_request_b<Out extends unknown = unknown>(ctx:http_Ctx<Out>):fetch_api_request_T<Out> {
	return be_<http_Ctx<Out>, typeof key>(key, ctx=>{
		const api_fetch = api_fetch_b(ctx)
		const auth_code_expired$ = auth_code_expired$_b(ctx)
		const consumer_login_user$ = consumer_login_user$_b(ctx)
		const refresh_auth_token = refresh_auth_token_b(ctx)
		const ro_auth_code_expired$ = ro_auth_code_expired$_b(ctx)
		let refresh_auth_token_promise:Promise<refresh_auth_token_payload_T>
		return fetch_api_request as fetch_api_request_T<Out>
		async function fetch_api_request(request:APIRequest_I, count = 0) {
			if (count > 3) throw `fetch_api_request loop error`
			const response = await api_fetch(request)
			const response_text = await response.text()
			if (!response_text) return response_text
			let json:any
			try {
				json = JSON.parse(response_text)
			} catch (err) {
				console.error(response_text)
				throw err
			}
			if (json?.Status === STATUS_ERROR) {
				if (json.Code === 'ERROR_INVALID_AUTHCODE') {
					const consumer_login_user = consumer_login_user$.$
					let refresh_auth_token_payload:refresh_auth_token_payload_T
					if (!refresh_auth_token_promise) {
						const requestQuery = new RefreshAuthTokenRequestQuery(consumer_login_user)
						refresh_auth_token_promise = new Promise(async (res, rej)=>{
							try {
								refresh_auth_token_payload = await refresh_auth_token(requestQuery)
								res(refresh_auth_token_payload)
								refresh_auth_token_promise = undefined
							} catch (e) {
								rej(e)
							}
						})
					}
					refresh_auth_token_payload = await refresh_auth_token_promise
					if (refresh_auth_token_payload.Code === 'success') {
						const AuthCode = refresh_auth_token_payload.Data
						consumer_login_user$.refresh({ AuthCode })
						const url = new URL(request.url)
						url.searchParams.set('x', AuthCode)
						request.url = url.toString()
						const retry_json = await fetch_api_request(request, count + 1)
						return retry_json
					}
					auth_code_expired$.set({
						type: 'CR',
						json,
					})
				}
				if (json.Code === 'INVALID_API_AUTHCODE') {
					ro_auth_code_expired$.set({
						type: 'RO',
						json,
					})
				}
			}
			return json
		}
	})(ctx)
}
export type fetch_api_request_T<Out extends unknown = unknown> = (request:APIRequest_I, count?:number)=>Promise<Out>
