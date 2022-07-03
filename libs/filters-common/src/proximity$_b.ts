import { B, be_ } from '@ctx-core/object'
import { subscribe_wait_timeout, Writable$ } from '@ctx-core/store'
import { neql_, run } from '@ctx-core/function'
import { idb_writable_ } from '@menus/idb'
import { query_proximity$_b } from '@menus/page'
import { timeout_ms } from '@menus/web-config'
import type { filters_common_Ctx } from './filters_common_Ctx.js'
import { FILTER_DEFAULT_VALUES } from './lib.js'
const key = 'proximity$'
export const proximity$_b:B<filters_common_Ctx, typeof key> = be_(key, (ctx)=>{
	const query_proximity$ = query_proximity$_b(ctx)
	const proximity$ = idb_writable_<string | number>('proximity',
		proximity=>{
			const query_proximity = query_proximity$.$

			return query_proximity ? query_proximity : proximity ? proximity : FILTER_DEFAULT_VALUES.PROXIMITY
		})
	run(async ()=>{
		await subscribe_wait_timeout(proximity$.ready$, neql_(undefined), timeout_ms)
		query_proximity$.subscribe(refresh)
	}).then()
	return proximity$ as proximity$_T
	function refresh() {
		const query_proximity = query_proximity$.$
		if (query_proximity) {
			proximity$.set(query_proximity)
		}
	}
})
export type proximity$_T = Writable$<number>
