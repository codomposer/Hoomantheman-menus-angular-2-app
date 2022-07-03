import { _b, B } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { DateTime_I } from '@menus/form-ui'
import type { ro_orders_Ctx } from './ro_orders_Ctx.js'
const key = 'ro_orders_filter_orders_date_range$'
export const ro_orders_filter_orders_date_range$_b:B<ro_orders_Ctx, typeof key> = _b(key, ()=>
	writable$(null)
)
export type ro_orders_filter_orders_date_range$_T = Writable$<DateTime_I>
