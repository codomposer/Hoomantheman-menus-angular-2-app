import { _b, assign, B } from '@ctx-core/object'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import { Order } from '@menus/shared-order'
import type { ro_orders_Ctx } from './ro_orders_Ctx.js'
const key = 'ro_orders_OrderList_a$'
export const ro_orders_OrderList_a$_b:B<ro_orders_Ctx, typeof key> = _b(key, ()=>{
	const ro_orders_OrderList_a$ = refresh_writable_<Order[][]>([])
	return assign(ro_orders_OrderList_a$, {
		reset() {
			ro_orders_OrderList_a$.$ = []
		}
	})
})
export interface ro_orders_OrderList_a$_T extends refresh_writable_T<Order[][]> {
	reset():void
}
