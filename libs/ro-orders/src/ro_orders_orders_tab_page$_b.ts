import { _b, assign, B } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { ro_orders_Ctx } from './ro_orders_Ctx.js'
const key = 'ro_orders_orders_tab_page$'
export const ro_orders_orders_tab_page$_b:B<ro_orders_Ctx, typeof key> = _b(key, ()=>{
	const ro_orders_orders_tab_page$ = writable$<number>(1)
	return assign(ro_orders_orders_tab_page$, {
		reset() {
			ro_orders_orders_tab_page$.$ = 1
		}
	})
})
export interface ro_orders_orders_tab_page$_T extends Writable$<number> {
	reset():void
}
