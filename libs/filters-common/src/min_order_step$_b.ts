import { B, be_ } from '@ctx-core/object'
import { subscribe_wait_timeout, Writable$ } from '@ctx-core/store'
import { neql_, run } from '@ctx-core/function'
import { idb_writable_ } from '@menus/idb'
import { query_min_order_step$_b } from '@menus/page'
import { timeout_ms } from '@menus/web-config'
import type { filters_common_Ctx } from './filters_common_Ctx.js'
import { FILTER_DEFAULT_VALUES } from './lib.js'
const key = 'min_order_step$'
export const min_order_step$_b:B<filters_common_Ctx, typeof key> = be_(key, (ctx)=>{
	const query_min_order_step$ = query_min_order_step$_b(ctx)
	const min_order_step$ = idb_writable_<string | number>('minOrderStep',
		min_order_step=>{
			const query_min_order_step = query_min_order_step$.$

			return query_min_order_step ? query_min_order_step : min_order_step ? min_order_step : FILTER_DEFAULT_VALUES.MIN_ORDER_STEP
		})
	run(async ()=>{
		await subscribe_wait_timeout(min_order_step$.ready$, neql_(undefined), timeout_ms)
		query_min_order_step$.subscribe(refresh)
	}).then()
	return min_order_step$ as min_order_step$_T
	function refresh() {
		const query_min_order_step = query_min_order_step$.$
		if (query_min_order_step) {
			min_order_step$.set(query_min_order_step)
		}
	}
})
export type min_order_step$_T = Writable$<number>
