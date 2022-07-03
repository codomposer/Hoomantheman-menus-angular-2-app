import { _b, B } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import type { ro_orders_Ctx } from './ro_orders_Ctx.js'
import { ro_orders_Pagination$_b } from './ro_orders_Pagination$_b.js'
const key = 'ro_orders_TotalRow$'
export const ro_orders_TotalRow$_b:B<ro_orders_Ctx, typeof key> = _b(key, (ctx)=>{
	const ro_orders_Pagination$ = ro_orders_Pagination$_b(ctx)
	return derived$(ro_orders_Pagination$, ro_orders_Pagination=>ro_orders_Pagination?.TotalRow || 0)
})
export type ro_orders_TotalRow$_T = Readable$<number>
