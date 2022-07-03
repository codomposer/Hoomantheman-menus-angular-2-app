import { run } from '@ctx-core/function'
import { assign, B, be_ } from '@ctx-core/object'
import { tup } from '@ctx-core/array'
import { derived$, Readable$, writable$ } from '@ctx-core/store'
import {
	API_ORDERS_detail_payload_T, success_API_ORDERS_detail_payload_T, error_API_ORDERS_detail_payload_T,
	RoRequestQuery, API_ORDERS_detail_b,
} from '@menus/ro-http'
import { params_fireFlyID$_b, params_orderID$_b } from '@menus/page'
import type { invalidate_mixin_T } from '@menus/store'
import { ro_login_user$_b } from '@menus/ro-user-common'
import type { API_error_T } from '@menus/api'
import { is_ERR_INVALID_ACCESS$_, is_ERR_INVALID_ACCESS$_mixin_T } from '@menus/ro-restaurant'
import type { ro_restaurant_ui_Ctx } from './ro_restaurant_ui_Ctx.js'
const key = 'API_ORDERS_detail_payload$'
export const API_ORDERS_detail_payload$_b:B<ro_restaurant_ui_Ctx, typeof key> = be_(key, ctx=>{
	const API_ORDERS_detail = API_ORDERS_detail_b(ctx)
	const invalidate_signal$ = writable$(undefined)
	let current_invalidate_signal:any
	const API_ORDERS_detail_payload$ = derived$(
		tup(ro_login_user$_b(ctx), params_fireFlyID$_b(ctx), params_orderID$_b(ctx), invalidate_signal$),
		([
			 ro_login_user,
			 params_fireFlyID,
			 params_orderID,
			 invalidate_signal
		 ], set
		)=>{
			if (!ro_login_user || !params_fireFlyID || !params_orderID) {
				set(null)
				return
			}
			// TODO: set(null) when current params_orderID !== payload orderID
			// Check current_API_ORDERS_detail_payload.RoOrder.ID
			run(async ()=>{
				const requestData = new RoRequestQuery()
				RoRequestQuery.fill_fireFlyID(requestData, params_fireFlyID)
				RoRequestQuery.fill_OrderID(requestData, params_orderID)
				const payload = await API_ORDERS_detail(requestData)
				if (
					params_fireFlyID === params_fireFlyID$_b(ctx)._
					&& params_orderID === params_orderID$_b(ctx)._
					&& invalidate_signal == current_invalidate_signal
				) {
					set(payload)
				}
			}).then()
		})
	return assign(API_ORDERS_detail_payload$, {
		invalidate() {
			current_invalidate_signal = {}
			invalidate_signal$.$ = current_invalidate_signal
		},
		is_ERR_INVALID_ACCESS$: is_ERR_INVALID_ACCESS$_(API_ORDERS_detail_payload$ as Readable$<API_error_T>)
	}) as API_ORDERS_detail_payload$_T
})
export interface API_ORDERS_detail_payload$_T
	extends Readable$<API_ORDERS_detail_payload_T>,
		invalidate_mixin_T, is_ERR_INVALID_ACCESS$_mixin_T {}
export type {
	success_API_ORDERS_detail_payload_T,
	error_API_ORDERS_detail_payload_T,
}
