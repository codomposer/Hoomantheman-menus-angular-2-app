import { _b, assign, B } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { ro_orders_Ctx } from './ro_orders_Ctx.js'
const key = 'ro_orders_filter_date_range$'
export const ro_orders_filter_date_range$_b:B<ro_orders_Ctx, typeof key> = _b(key, ()=>{
	const ro_orders_filter_date_range$ = writable$<string[]>([])
	return assign(ro_orders_filter_date_range$, {
		reset() {
			ro_orders_filter_date_range$.$ = []
		}
	})
})
export interface ro_orders_filter_date_range$_T extends Writable$<string[]> {
	reset():void
}
