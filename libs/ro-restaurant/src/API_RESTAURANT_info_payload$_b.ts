import { tup } from '@ctx-core/array'
import { neql_, nullish, run } from '@ctx-core/function'
import { assign, B, be_ } from '@ctx-core/object'
import { derived$, Readable$, subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import type { API_error_T } from '@menus/api'
import { params_fireFlyID$_b } from '@menus/page'
import {
	API_RESTAURANT_info_payload$_T as http_API_RESTAURANT_info_payload_T, error_API_RESTAURANT_info_payload_T,
	success_API_RESTAURANT_info_payload_T, ro_httpClient_b, RoRequestQuery,
} from '@menus/ro-http'
import { ro_login_user$_b } from '@menus/ro-user-common'
import type { invalidate_mixin_T } from '@menus/store'
import { timeout_ms } from '@menus/web-config'
import { is_ERR_INVALID_ACCESS$_, is_ERR_INVALID_ACCESS$_mixin_T } from './is_ERR_INVALID_ACCESS$_.js'
import type { ro_restaurant_Ctx } from './ro_restaurant_Ctx.js'
const key = 'API_RESTAURANT_info_payload$'
export const API_RESTAURANT_info_payload$_b:B<ro_restaurant_Ctx, typeof key> = be_(key, ctx=>{
	const invalidate_signal$:Writable$<any> = writable$(undefined)
	let current_invalidate_signal:any
	const params_fireFlyID$ = params_fireFlyID$_b(ctx)
	const ro_httpClient = ro_httpClient_b(ctx)
	const ro_login_user$ = ro_login_user$_b(ctx)
	const API_RESTAURANT_info_payload$ = derived$(tup(ro_login_user$, params_fireFlyID$, invalidate_signal$),
		([ro_login_user, params_fireFlyID, invalidate_signal],
		 set
		)=>{
			if (!ro_login_user || !params_fireFlyID) {
				set(null)
				return
			}
			const requestData = new RoRequestQuery()
			RoRequestQuery.fill_fireFlyID(requestData, params_fireFlyID)
			run(async ()=>{
				const payload = await ro_httpClient.API_RESTAURANT_info(requestData)
				if (params_fireFlyID) {
					await subscribe_wait_timeout(params_fireFlyID$, neql_(undefined), timeout_ms)
				}
				if (
					params_fireFlyID === params_fireFlyID$.$
					&& invalidate_signal == current_invalidate_signal
				) {
					set(payload)
				}
			}).then()
		}
	)
	return assign(API_RESTAURANT_info_payload$, {
		invalidate() {
			current_invalidate_signal = {}
			invalidate_signal$.set(current_invalidate_signal)
		},
		is_ERR_INVALID_ACCESS$: is_ERR_INVALID_ACCESS$_(API_RESTAURANT_info_payload$ as Readable$<API_error_T>)
	}) as API_RESTAURANT_info_payload$_T
})
export interface API_RESTAURANT_info_payload$_T
	extends Readable$<http_API_RESTAURANT_info_payload_T|nullish>,
		invalidate_mixin_T, is_ERR_INVALID_ACCESS$_mixin_T {}
export type {
	success_API_RESTAURANT_info_payload_T,
	error_API_RESTAURANT_info_payload_T
}
