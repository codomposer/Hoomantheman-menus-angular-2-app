import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { PaginationPayload } from '@menus/api'
import type { ro_orders_Ctx } from './ro_orders_Ctx.js'
const key = 'ro_orders_Pagination$'
export const ro_orders_Pagination$_b:B<ro_orders_Ctx, typeof key> = be_(key, ()=>{
	return writable$(null)
})
export type ro_orders_Pagination$_T = Writable$<PaginationPayload>
