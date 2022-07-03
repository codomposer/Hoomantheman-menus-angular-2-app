import { _b, assign, B } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { ro_orders_Ctx } from './ro_orders_Ctx.js'
const key = 'ro_orders_filter_serviceTypeId$'
export const ro_orders_filter_serviceTypeId$_b:B<ro_orders_Ctx, typeof key> = _b(key, ()=>{
	const ro_orders_filter_serviceTypeId$ = writable$(-1)
	return assign(ro_orders_filter_serviceTypeId$, {
		reset() {
			ro_orders_filter_serviceTypeId$.$ = -1
		}
	})
})
export interface ro_orders_filter_serviceTypeId$_T extends Writable$<number> {
	reset():void
}
