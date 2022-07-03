import { _b, B } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { ro_orders_Ctx } from './ro_orders_Ctx.js'
const key = 'ro_orders_export_url$'
export const ro_orders_export_url$_b:B<ro_orders_Ctx, typeof key> = _b(key, ()=>
	writable$<string>(null)
)
export type ro_orders_export_url$_T = Writable$<string>
