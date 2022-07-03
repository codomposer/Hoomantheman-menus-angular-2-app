import { has_dom } from '@ctx-core/dom'
import { performance_now } from '@ctx-core/function'
import { round } from '@ctx-core/number'
import { assign, B, be_ } from '@ctx-core/object'
import type { APIRequest_I } from '@menus/api'
import { notyf_banner_error_map$_b } from '@menus/notyf'
import type { http_Ctx } from './http_Ctx.js'
const retry_count_max = 4
const key = 'api_fetch'
const connection_error_msg = 'Connection error. Please reconnect to the internet...'
export const api_fetch_b:B<http_Ctx, typeof key> = be_(key, (ctx)=>{
	const notyf_banner_error_map$ = notyf_banner_error_map$_b(ctx)
	// const notyf_error = notyf_error_b(ctx)
	return api_fetch
	async function api_fetch(request:APIRequest_I) {
		const { body } = request
		const method = request.method.toUpperCase()
		const start_ms = performance_now()
		let retry_count = 0, response:Response
		try {
			return await _fetch()
		} finally {
			const end_ms = performance_now()
			console.log(
				round(end_ms, 2),
				round(end_ms - start_ms, 2),
				response?.status || '—',
				method,
				request.url)
		}
		async function _fetch():Promise<Response> {
			try {
				response = await fetch(request.url, {
					method,
					body,
					headers:
					// See: https://muffinman.io/uploading-files-using-fetch-multipart-form-data/
						(has_dom && body instanceof FormData)
						? request.headers
						: assign({
							'Accept': 'application/json, text/plain, */*',
							'Content-Type': 'application/json',
						}, request.headers)
				})
				notyf_banner_error_map$.dismiss(connection_error_msg).then()
				return response
			} catch (e) {
				if (~[
						'Failed to fetch', 'Network request failed', 'The Internet connection appears to be offline.', 'Timeout',
					].indexOf(e.message)
					|| /offline/.test(e)
				) {
					retry_count += 1
					if (retry_count <= retry_count_max) {
						return await _fetch()
					} else {
						notyf_banner_error_map$.activate(connection_error_msg).then()
						// notyf_error('Connection error. Please reconnect to the internet...')
						throw e
					}
				} else {
					throw e
				}
			}
		}
	}
})
export type api_fetch_T = (request:APIRequest_I)=>Promise<Response>
