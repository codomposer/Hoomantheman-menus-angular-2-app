import { B, be_ } from '@ctx-core/object'
import { Readable$, derived$ } from '@ctx-core/store'
import { MIN_ORDER_STEPS_VAL, MinOrder } from './lib.js'
import { min_order_step$_b } from './min_order_step$_b.js'
import type { filters_common_Ctx } from './filters_common_Ctx.js'
const key = 'min_order$'
export const min_order$_b:B<filters_common_Ctx, typeof key> = be_(key, ctx=>
	derived$(min_order_step$_b(ctx), min_order_step=>
		min_order_step == null ? MIN_ORDER_STEPS_VAL[min_order_step] : min_order_step
	) as min_order$_T
)
export type min_order$_T = Readable$<MinOrder|null>
