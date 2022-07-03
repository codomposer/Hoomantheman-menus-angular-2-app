import { run } from '@ctx-core/function'
import { assign, B, be_ } from '@ctx-core/object'
import { tup } from '@ctx-core/array'
import { derived$, Readable$, writable$ } from '@ctx-core/store'
import { API_COUPONS_list_payload_T, ro_httpClient_b, RoRequestQuery } from '@menus/ro-http'
import { ro_login_user$_b } from '@menus/ro-user-common'
import { params_fireFlyID$_b } from '@menus/page'
import type { invalidate_mixin_T } from '@menus/store'
import type { API_error_T } from '@menus/api'
import { is_ERR_INVALID_ACCESS$_, is_ERR_INVALID_ACCESS$_mixin_T } from '@menus/ro-restaurant'
import type { ro_restaurant_ui_Ctx } from './ro_restaurant_ui_Ctx.js'
const key = 'API_COUPONS_list_payload$'
export const API_COUPONS_list_payload$_b:B<ro_restaurant_ui_Ctx, typeof key> = be_(key, ctx=>{
	const invalidate_signal$ = writable$<any>(undefined)
	const ro_httpClient = ro_httpClient_b(ctx)
	let current_invalidate_signal:any
	const API_COUPONS_list_payload$:Readable$<API_COUPONS_list_payload_T> = derived$(
		tup(ro_login_user$_b(ctx), params_fireFlyID$_b(ctx), invalidate_signal$),
		([ro_login_user, params_fireFlyID, invalidate_signal],
		 set
		)=>{
			if (!ro_login_user || !params_fireFlyID) {
				set(null)
				return
			}
			// TODO: set(null) when current $orderID !== payload orderID
			// Check current_API_COUPONS_list_payload.RoOrder.ID
			run(async ()=>{
				const requestData = new RoRequestQuery()
				RoRequestQuery.fill_fireFlyID(requestData, params_fireFlyID)
				const payload = await ro_httpClient.API_COUPONS_list(requestData)
				if (
					params_fireFlyID === params_fireFlyID$_b(ctx)._
					&& invalidate_signal == current_invalidate_signal
				) {
					set(payload)
				}
			}).then()
		})
	return assign(API_COUPONS_list_payload$, {
		invalidate() {
			current_invalidate_signal = {}
			invalidate_signal$.$ = current_invalidate_signal
		},
		is_ERR_INVALID_ACCESS$: is_ERR_INVALID_ACCESS$_(API_COUPONS_list_payload$ as Readable$<API_error_T>)
	})
})
export interface API_COUPONS_list_payload$_T extends Readable$<API_COUPONS_list_payload_T>,
	invalidate_mixin_T,
	is_ERR_INVALID_ACCESS$_mixin_T {}
