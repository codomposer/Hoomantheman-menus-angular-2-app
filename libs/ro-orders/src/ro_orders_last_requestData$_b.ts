import { _b, B } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import { RoRequestQuery } from '@menus/ro-http'
import type { ro_orders_Ctx } from './ro_orders_Ctx.js'
const key = 'ro_orders_last_requestData$'
export const ro_orders_last_requestData$_b:B<ro_orders_Ctx, typeof key> = _b(key, ()=>
	writable$(new RoRequestQuery())
)
export type ro_orders_last_requestData$_T = Writable$<RoRequestQuery>
