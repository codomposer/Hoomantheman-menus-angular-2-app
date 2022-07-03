import { B, be_ } from '@ctx-core/object'
import { subscribe_wait_timeout, Writable$ } from '@ctx-core/store'
import { neql_, run } from '@ctx-core/function'
import { idb_writable_ } from '@menus/idb'
import { query_max_price$_b } from '@menus/page'
import { timeout_ms } from '@menus/web-config'
import type { filters_common_Ctx } from './filters_common_Ctx.js'
import { FILTER_DEFAULT_VALUES } from './lib.js'
const key = 'max_price$'
export const max_price$_b:B<filters_common_Ctx, typeof key> = be_(key, (ctx) => {
	const query_max_price$ = query_max_price$_b(ctx)
	const max_price$ = idb_writable_<string | number>('maxPrice',
		max_price=>{
			const query_max_price = query_max_price$.$

			return query_max_price ? query_max_price : max_price ? max_price : FILTER_DEFAULT_VALUES.MAX_PRICE
		})
	run(async ()=>{
		await subscribe_wait_timeout(max_price$.ready$, neql_(undefined), timeout_ms)
		query_max_price$.subscribe(refresh)
	}).then()
	return max_price$ as max_price$_T
	function refresh() {
		const query_max_price = query_max_price$.$
		if (query_max_price) {
			max_price$.set(query_max_price)
		}
	}
})
export type max_price$_T = Writable$<number>
