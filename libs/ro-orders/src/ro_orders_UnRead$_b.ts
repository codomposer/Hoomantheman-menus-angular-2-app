import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { ro_orders_API_ORDERS_list_payload$_b } from './ro_orders_API_ORDERS_list_payload$_b.js'
import type { ro_orders_Ctx } from './ro_orders_Ctx.js'
const key = 'ro_orders_UnRead$'
export const ro_orders_UnRead$_b:B<ro_orders_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_orders_API_ORDERS_list_payload$ = ro_orders_API_ORDERS_list_payload$_b(ctx)
	return derived$(ro_orders_API_ORDERS_list_payload$, ro_orders_API_ORDERS_list_payload=>
		ro_orders_API_ORDERS_list_payload?.UnRead
	)
})
export type ro_orders_UnRead$_T = Readable$<number>
