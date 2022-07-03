import { _b, assign, B } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { ro_orders_Ctx } from './ro_orders_Ctx.js'
const key = 'ro_orders_filter_order_StatusID$'
export const ro_orders_filter_order_StatusID$_b:B<ro_orders_Ctx, typeof key> = _b(key, ()=>{
	const ro_orders_filter_order_StatusID$ = writable$(-1)
	return assign(ro_orders_filter_order_StatusID$, {
		reset() {
			ro_orders_filter_order_StatusID$.$ = -1
		}
	})
})
export interface ro_orders_filter_order_StatusID$_T extends Writable$<number> {
	reset():void
}
