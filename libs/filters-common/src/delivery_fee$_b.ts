import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { DELIVERY_STEPS_VAL, DeliveryCharge } from './lib.js'
import { delivery_fee_step$_b } from './delivery_fee_step$_b.js'
import type { filters_common_Ctx } from './filters_common_Ctx.js'
const key = 'delivery_fee$'
export const delivery_fee$_b:B<filters_common_Ctx, typeof key> = be_(key, ctx=>
	derived$(delivery_fee_step$_b(ctx), delivery_fee_)
)
export const delivery_fee_ =
	(delivery_fee_step:number)=>
		DELIVERY_STEPS_VAL[delivery_fee_step]
export type delivery_fee$_T = Readable$<DeliveryCharge>
