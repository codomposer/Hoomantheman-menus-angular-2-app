import { assign, B, be_ } from '@ctx-core/object'
import { Writable$ } from '@ctx-core/store'
import { refresh_writable_, refresh_mixin_T } from '@menus/store'
import type { RoCoupon } from '@menus/ro-shared-models'
import type { success_API_COUPONS_list_payload_T } from '@menus/ro-http'
import type { API_error_T } from '@menus/api'
import type { is_ERR_INVALID_ACCESS$_mixin_T } from '@menus/ro-restaurant'
import { API_COUPONS_list_payload$_b } from './API_COUPONS_list_payload$_b.js'
import type { ro_restaurant_ui_Ctx } from './ro_restaurant_ui_Ctx.js'
const key = 'coupons$'
export const coupons$_b:B<ro_restaurant_ui_Ctx, typeof key> = be_(key, ctx=>{
	const coupons$ = refresh_writable_<coupons_T>(null)
	const API_COUPONS_list_payload$ = API_COUPONS_list_payload$_b(ctx)
	const unsubscribers = [
		API_COUPONS_list_payload$.subscribe(API_COUPONS_list_payload=>{
			const coupons = (
				API_COUPONS_list_payload as success_API_COUPONS_list_payload_T
			)?.Data
			if (coupons) {
				coupons$.$ = coupons
			} else {
				coupons$.$ = null
			}
		})
	]
	return assign(coupons$, {
		onDestroy() {
			unsubscribers.forEach(fn=>fn())
		},
		is_ERR_INVALID_ACCESS$: API_COUPONS_list_payload$.is_ERR_INVALID_ACCESS$
	}) as coupons$_T
})
export type coupons_T = RoCoupon[]|API_error_T
export interface coupons$_T extends Writable$<coupons_T>,
	refresh_mixin_T<coupons_T>, is_ERR_INVALID_ACCESS$_mixin_T {
}
