import { run } from '@ctx-core/function'
import { assign, B, be_ } from '@ctx-core/object'
import { tup } from '@ctx-core/array'
import { derived$, Readable$, writable$ } from '@ctx-core/store'
import type { invalidate_mixin_T } from '@menus/store'
import { API_MENUS_heading_info_payload_T, ro_httpClient_b, RoRequestQuery, } from '@menus/ro-http'
import { ro_login_user$_b } from '@menus/ro-user-common'
import { params_fireFlyID$_b, params_HeadingID$_b } from '@menus/page'
import type { API_error_T } from '@menus/api'
import { is_ERR_INVALID_ACCESS$_, is_ERR_INVALID_ACCESS$_mixin_T, is_ERR_INVALID_ACCESS$_T } from '@menus/ro-restaurant'
import type { ro_restaurant_ui_Ctx } from './ro_restaurant_ui_Ctx.js'
const key = 'API_MENUS_heading_info_payload$'
export const API_MENUS_heading_info_payload$_b:B<ro_restaurant_ui_Ctx, typeof key> = be_(key, ctx=>{
	const invalidate_signal$ = writable$(undefined)
	let current_invalidate_signal:any
	const API_MENUS_heading_info_payload$:Readable$<API_MENUS_heading_info_payload_T> = derived$(
		tup(ro_login_user$_b(ctx), params_fireFlyID$_b(ctx), params_HeadingID$_b(ctx), invalidate_signal$),
		([ro_login_user, params_fireFlyID, params_HeadingID, invalidate_signal],
		 set
		)=>{
			if (!ro_login_user || !params_fireFlyID || !params_HeadingID) {
				set(null)
				return
			}
			if (
				API_MENUS_heading_info_payload$.$?.Data?.ID
			) {
				set(null)
			}
			run(async ()=>{
				const requestData = new RoRequestQuery()
				RoRequestQuery.fill_fireFlyID(requestData, params_fireFlyID)
				RoRequestQuery.fill_ID(requestData, params_HeadingID)
				const payload = await ro_httpClient_b(ctx).API_MENUS_heading_info(requestData)
				if (
					params_fireFlyID === params_fireFlyID$_b(ctx)._
					&& params_HeadingID === params_HeadingID$_b(ctx)._
					&& invalidate_signal == current_invalidate_signal
				) {
					set(payload)
				}
			}).then()
		}) as API_MENUS_heading_info_payload$_T
	return assign(API_MENUS_heading_info_payload$, {
		invalidate() {
			current_invalidate_signal = {}
			invalidate_signal$.$ = current_invalidate_signal
		},
		is_ERR_INVALID_ACCESS$:
			is_ERR_INVALID_ACCESS$_(API_MENUS_heading_info_payload$ as Readable$<API_error_T>)
	})
})
export interface API_MENUS_heading_info_payload$_T extends Readable$<API_MENUS_heading_info_payload_T>,
	invalidate_mixin_T, is_ERR_INVALID_ACCESS$_mixin_T {
	invalidate():void
	is_ERR_INVALID_ACCESS$:is_ERR_INVALID_ACCESS$_T
}
