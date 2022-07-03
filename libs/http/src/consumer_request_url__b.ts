import { has_dom } from '@ctx-core/dom'
import { neql_ } from '@ctx-core/function'
import { B, be_, deep_clone } from '@ctx-core/object'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { timeout_ms } from '@menus/web-config'
import type { http_Ctx } from './http_Ctx.js'
import { PublicKey$_b } from './PublicKey$_b.js'
import { shared_request_url__b } from './shared_request_url__b.js'
const key = 'consumer_request_url_'
export const consumer_request_url__b:B<http_Ctx, typeof key> = be_(key, ctx=>{
	const PublicKey$ = PublicKey$_b(ctx)
	const shared_request_url_ = shared_request_url__b(ctx)
	return consumer_request_url_ as consumer_request_url__T
	async function consumer_request_url_(in_params:consumer_request_url_params__I):Promise<string> {
		const params = deep_clone(in_params)
		if (!params.data) params.data = {}
		params.data.pcpk = params.data.pcpk || (
			has_dom
			? (
				await subscribe_wait_timeout(
					PublicKey$, neql_(undefined), timeout_ms
				)
			)
			: (PublicKey$.$ || '')
		)
		const url = shared_request_url_(params)
		return url
	}
})
export type consumer_request_url__T = (params:consumer_request_url_params__I)=>Promise<string>
export interface consumer_request_url_params__I {
	path:string
	pcpk?:string
	data?:any
}
