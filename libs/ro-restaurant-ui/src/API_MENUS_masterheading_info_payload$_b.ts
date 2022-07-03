import { tup } from '@ctx-core/array'
import { run } from '@ctx-core/function'
import { assign, B, be_ } from '@ctx-core/object'
import { derived$, Readable$, writable$ } from '@ctx-core/store'
import type { API_error_T } from '@menus/api'
import { params_fireFlyID$_b, params_MasterheadingID$_b } from '@menus/page'
import {
	API_MENUS_masterheading_info_payload_T, error_API_MENUS_masterheading_info_payload_T, ro_httpClient_b,
	RoRequestQuery, success_API_MENUS_masterheading_info_payload_T,
} from '@menus/ro-http'
import { is_ERR_INVALID_ACCESS$_, is_ERR_INVALID_ACCESS$_mixin_T } from '@menus/ro-restaurant'
import { ro_login_user$_b } from '@menus/ro-user-common'
import type { invalidate_mixin_T } from '@menus/store'
import type { ro_restaurant_ui_Ctx } from './ro_restaurant_ui_Ctx.js'
const key = 'API_MENUS_masterheading_info_payload$'
export const API_MENUS_masterheading_info_payload$_b:B<ro_restaurant_ui_Ctx, typeof key> = be_(key, ctx=>{
	const invalidate_signal$ = writable$(undefined)
	const ro_httpClient = ro_httpClient_b(ctx)
	let current_invalidate_signal:any
	const API_MENUS_masterheading_info_payload$ = derived$(
		tup(ro_login_user$_b(ctx), params_fireFlyID$_b(ctx), params_MasterheadingID$_b(ctx), invalidate_signal$),
		([ro_login_user, params_fireFlyID, params_MasterheadingID, invalidate_signal],
		 set
		)=>{
			if (!ro_login_user || !params_fireFlyID || !params_MasterheadingID) {
				set(null)
				return
			}
			const current_API_MENUS_masterheading_info_payload =
				API_MENUS_masterheading_info_payload$.$ as success_API_MENUS_masterheading_info_payload_T
			if (current_API_MENUS_masterheading_info_payload?.Data?.ID !== params_MasterheadingID) {
				set(null)
			}
			run(async ()=>{
				const payload = await fetch(params_fireFlyID, params_MasterheadingID)
				if (
					params_fireFlyID === params_fireFlyID$_b(ctx)._
					&& params_MasterheadingID === params_MasterheadingID$_b(ctx)._
					&& invalidate_signal == current_invalidate_signal
				) {
					set(payload)
				}
			}).then()
		})
	return assign(API_MENUS_masterheading_info_payload$, {
		is_ERR_INVALID_ACCESS$: is_ERR_INVALID_ACCESS$_(API_MENUS_masterheading_info_payload$ as Readable$<API_error_T>),
		invalidate() {
			current_invalidate_signal = {}
			invalidate_signal$.$ = current_invalidate_signal
		},
		fetch,
	}) as API_MENUS_masterheading_info_payload$_T
	async function fetch(fireFlyID:string, MasterheadingID:number) {
		const requestData = new RoRequestQuery()
		RoRequestQuery.fill_fireFlyID(requestData, fireFlyID)
		RoRequestQuery.fill_ID(requestData, MasterheadingID)
		return await ro_httpClient.API_MENUS_masterheading_info(requestData)
	}
})
export interface API_MENUS_masterheading_info_payload_I {
	fetch:API_MENUS_masterheading_info_payload_fetch_T
}
export interface API_MENUS_masterheading_info_payload$_T extends Readable$<API_MENUS_masterheading_info_payload_T>,
	invalidate_mixin_T, is_ERR_INVALID_ACCESS$_mixin_T,
	API_MENUS_masterheading_info_payload_I {}
export type API_MENUS_masterheading_info_payload_fetch_T =
	(fireFlyID:string, MasterheadingID:number)=>
		Promise<API_MENUS_masterheading_info_payload_T>
export type {
	success_API_MENUS_masterheading_info_payload_T,
	error_API_MENUS_masterheading_info_payload_T,
}
