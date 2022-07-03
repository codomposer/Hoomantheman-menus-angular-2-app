import { B, be_ } from '@ctx-core/object'
import { subscribe_wait_timeout, Writable$ } from '@ctx-core/store'
import { neql_, run } from '@ctx-core/function'
import { idb_writable_ } from '@menus/idb'
import { query_delivery_fee_step$_b } from '@menus/page'
import { timeout_ms } from '@menus/web-config'
import type { filters_common_Ctx } from './filters_common_Ctx.js'
import { FILTER_DEFAULT_VALUES } from './lib.js'
const key = 'delivery_fee_step$'
export const delivery_fee_step$_b:B<filters_common_Ctx, typeof key> = be_(key, (ctx)=>{
	const query_delivery_fee_step$ = query_delivery_fee_step$_b(ctx)
	const delivery_fee_step$ = idb_writable_<string | number>('deliveryFeeStep',
		delivery_fee_step=>{
			const query_delivery_fee_step = query_delivery_fee_step$.$

			return query_delivery_fee_step ? query_delivery_fee_step : delivery_fee_step ? delivery_fee_step : FILTER_DEFAULT_VALUES.DELIVERY_FEE_STEP
		})
	run(async ()=>{
		await subscribe_wait_timeout(delivery_fee_step$.ready$, neql_(undefined), timeout_ms)
		query_delivery_fee_step$.subscribe(refresh)
	}).then()
	return delivery_fee_step$ as delivery_fee_step$_T
	function refresh() {
		const query_delivery_fee_step = query_delivery_fee_step$.$
		if (query_delivery_fee_step) {
			delivery_fee_step$.set(query_delivery_fee_step)
		}
	}
})
export type delivery_fee_step$_T = Writable$<number>
