import { tup } from '@ctx-core/array'
import { run } from '@ctx-core/function'
import { assign, B, be_ } from '@ctx-core/object'
import { derived$, Readable$, writable$ } from '@ctx-core/store'
import type { API_error_T } from '@menus/api'
import { params_HeadingID$_b, params_fireFlyID$_b } from '@menus/page'
import {
	API_MENUS_menu_list_b, API_MENUS_menu_list_payload_T, error_API_MENUS_menu_list_payload_T,
	success_API_MENUS_menu_list_payload_T,
} from '@menus/ro-http'
import { is_ERR_INVALID_ACCESS$_, is_ERR_INVALID_ACCESS$_mixin_T } from '@menus/ro-restaurant'
import { ro_login_user$_b } from '@menus/ro-user-common'
import type { invalidate_mixin_T } from '@menus/store'
import { API_MENUS_menu_list_payload_ } from './API_MENUS_menu_list_payload_.js'
import type { ro_restaurant_ui_Ctx } from './ro_restaurant_ui_Ctx.js'
const key = 'API_MENUS_menu_list_payload$'
export const API_MENUS_menu_list_payload$_b:B<ro_restaurant_ui_Ctx, typeof key> = be_(key, ctx=>{
	const invalidate_signal$ = writable$(undefined)
	let current_invalidate_signal:any
	const API_MENUS_menu_list_payload$ = derived$(
		tup(ro_login_user$_b(ctx), params_fireFlyID$_b(ctx), params_HeadingID$_b(ctx), invalidate_signal$),
		([
			 ro_login_user,
			 params_fireFlyID,
			 params_HeadingID,
			 invalidate_signal
		 ], set)=>{
			if (!ro_login_user || !params_fireFlyID || !params_HeadingID) {
				set(null)
				return
			}
			run(async ()=>{
				const payload = await API_MENUS_menu_list_payload_(
					API_MENUS_menu_list_b(ctx), params_fireFlyID, params_HeadingID
				)
				if (
					params_fireFlyID === params_fireFlyID$_b(ctx)._
					&& params_HeadingID === params_HeadingID$_b(ctx)._
					&& invalidate_signal == current_invalidate_signal
				) {
					set(payload)
				}
			}).then()
		})
	return assign(API_MENUS_menu_list_payload$, {
		invalidate() {
			current_invalidate_signal = {}
			invalidate_signal$.$ = current_invalidate_signal
		},
		is_ERR_INVALID_ACCESS$: is_ERR_INVALID_ACCESS$_(API_MENUS_menu_list_payload$ as Readable$<API_error_T>)
	}) as API_MENUS_menu_list_payload$_T
})
export interface API_MENUS_menu_list_payload$_T
	extends Readable$<API_MENUS_menu_list_payload_T|undefined>,
		invalidate_mixin_T, is_ERR_INVALID_ACCESS$_mixin_T {}
export type {
	success_API_MENUS_menu_list_payload_T,
	error_API_MENUS_menu_list_payload_T,
}
