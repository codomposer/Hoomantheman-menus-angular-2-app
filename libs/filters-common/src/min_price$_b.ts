import { B, be_ } from '@ctx-core/object'
import { subscribe_wait_timeout, Writable$ } from '@ctx-core/store'
import { neql_, run } from '@ctx-core/function'
import { idb_writable_ } from '@menus/idb'
import { query_min_price$_b } from '@menus/page'
import { timeout_ms } from '@menus/web-config'
import type { filters_common_Ctx } from './filters_common_Ctx.js'
import { FILTER_DEFAULT_VALUES } from './lib.js'
const key = 'min_price$'
export const min_price$_b:B<filters_common_Ctx, typeof key> = be_(key, (ctx) => {
	const query_min_price$ = query_min_price$_b(ctx)
	const min_price$ = idb_writable_<string | number>('minPrice',
		min_price=>{
			const query_min_price = query_min_price$.$

			return query_min_price ? query_min_price : min_price ? min_price : FILTER_DEFAULT_VALUES.MIN_PRICE
		})
	run(async ()=>{
		await subscribe_wait_timeout(min_price$.ready$, neql_(undefined), timeout_ms)
		query_min_price$.subscribe(refresh)
	}).then()
	return min_price$ as min_price$_T
	function refresh() {
		const query_min_price = query_min_price$.$
		if (query_min_price) {
			min_price$.set(query_min_price)
		}
	}
})
export type min_price$_T = Writable$<number>
