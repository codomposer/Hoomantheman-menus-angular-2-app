import { B, be_ } from '@ctx-core/object'
import { page_query$_b } from '@ctx-core/sapper'
import { derived$, Readable$ } from '@ctx-core/store'
import type { ro_orders_Ctx } from './ro_orders_Ctx.js'
const key = 'ro_orders_ordersSearch$'
export const ro_orders_ordersSearch$_b:B<ro_orders_Ctx, typeof key> = be_(key, ctx=>{
	const page_query$ = page_query$_b(ctx)
	return derived$(page_query$, page_query=>
		page_query?.ordersSearch || ''
	) as ro_orders_ordersSearch$_T
})
export type ro_orders_ordersSearch$_T = Readable$<string>
