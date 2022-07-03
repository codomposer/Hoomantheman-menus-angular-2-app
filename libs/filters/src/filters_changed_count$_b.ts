import { B, be_ } from '@ctx-core/object'
import { tup } from '@ctx-core/array'
import { derived$, Readable$ } from '@ctx-core/store'
import {
	delivery_fee_step$_b, max_price$_b, min_order_step$_b, min_price$_b, proximity$_b, FILTER_DEFAULT_VALUES,
} from '@menus/filters-common'
import { selected_cuisines$_b } from '@menus/search-menu-common'
import type { filters_Ctx } from './filters_Ctx.js'
const key = 'filters_changed_count$'
export const filters_changed_count$_b:B<filters_Ctx, typeof key> = be_(key, ctx=>
	derived$(tup(
		proximity$_b(ctx),
		delivery_fee_step$_b(ctx),
		min_order_step$_b(ctx),
		min_price$_b(ctx),
		max_price$_b(ctx),
		selected_cuisines$_b(ctx),
	), (
		[
			proximity,
			delivery_fee_step,
			min_order_step,
			min_price,
			max_price,
			selected_cuisines,
		]
	)=>(
		(proximity === FILTER_DEFAULT_VALUES.PROXIMITY ? 0 : 1)
		+ (delivery_fee_step === FILTER_DEFAULT_VALUES.DELIVERY_FEE_STEP ? 0 : 1)
		+ (min_order_step === FILTER_DEFAULT_VALUES.MIN_ORDER_STEP ? 0 : 1)
		+ (min_price === FILTER_DEFAULT_VALUES.MIN_PRICE ? 0 : 1)
		+ (max_price === FILTER_DEFAULT_VALUES.MAX_PRICE ? 0 : 1)
		+ (selected_cuisines?.length || 0)
	))
)
export type filters_changed_count$_T = Readable$<number>
