import { _b, B } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { Order } from '@menus/shared-order'
import type { ro_orders_Ctx } from './ro_orders_Ctx.js'
const key = 'ro_orders_latest_top_order$'
export const ro_orders_latest_top_order$_b:B<ro_orders_Ctx, typeof key> = _b(key, ()=>
	writable$<Order>(undefined)
)
export type ro_orders_latest_top_order$_T = Writable$<Order>
