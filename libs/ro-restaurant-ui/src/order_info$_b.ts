import { assign, B, be_ } from '@ctx-core/object'
import { invalidate_mixin_T, refresh_writable_, refresh_writable_T } from '@menus/store'
import type { RoOrder } from '@menus/ro-shared-models'
import { Path } from '@menus/route'
import { url_friendly_names$_b } from '@menus/breadcrumb'
import { params_fireFlyID$_b, params_orderID$_b } from '@menus/page'
import { API_ORDERS_detail_payload$_b, success_API_ORDERS_detail_payload_T } from './API_ORDERS_detail_payload$_b.js'
import type { ro_restaurant_ui_Ctx } from './ro_restaurant_ui_Ctx.js'
import { is_ERR_INVALID_ACCESS$_mixin_T, is_ERR_INVALID_ACCESS$_T } from '@menus/ro-restaurant'
const key = 'order_info$'
export const order_info$_b:B<ro_restaurant_ui_Ctx, typeof key> = be_(key, ctx=>{
	const order_info$:refresh_writable_T<RoOrder> = refresh_writable_<RoOrder>(undefined)
	const API_ORDERS_detail_payload$ = API_ORDERS_detail_payload$_b(ctx)
	const url_friendly_names$ = url_friendly_names$_b(ctx)
	const params_fireFlyID$ = params_fireFlyID$_b(ctx)
	const params_orderID$ = params_orderID$_b(ctx)
	const unsubscribers = [
		API_ORDERS_detail_payload$.subscribe(API_ORDERS_detail_payload=>{
			const order_info = API_ORDERS_detail_payload as success_API_ORDERS_detail_payload_T|null
			if (order_info) {
				order_info$.$ = order_info
				set_order_url_friendly_names(order_info)
			} else {
				order_info$.$ = null
			}
		})
	]
	return assign(order_info$, {
		onDestroy() {
			unsubscribers.forEach(fn=>fn())
		},
		invalidate: API_ORDERS_detail_payload$.invalidate,
		is_ERR_INVALID_ACCESS$: API_ORDERS_detail_payload$.is_ERR_INVALID_ACCESS$,
	})
	function set_order_url_friendly_names(order_info:RoOrder) {
		url_friendly_names$.update(url_friendly_names=>{
			url_friendly_names.set([
					`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}`,
					params_fireFlyID$.$,
					Path.RO.ORDER_DETAILS,
					params_orderID$.$,
				].join('/'),
				order_info.OrderDetail.OrderNumber,
			)
			return url_friendly_names
		})
	}
})
export interface order_info$_T
	extends refresh_writable_T<RoOrder>,
		invalidate_mixin_T, is_ERR_INVALID_ACCESS$_mixin_T {
	invalidate():void
	is_ERR_INVALID_ACCESS$:is_ERR_INVALID_ACCESS$_T
}
