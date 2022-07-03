import { B, be_ } from '@ctx-core/object'
import { tup } from '@ctx-core/array'
import { derived$, Readable$ } from '@ctx-core/store'
import { minute_tick$_b } from '@menus/date'
import type { AvailabilityCtx } from '@menus/restaurant'
import { service_restaurant_hours$_b } from './service_restaurant_hours$_b.js'
import { availability_ctx_ } from './availability_ctx_.js'
import type { restaurant_hours_Ctx } from './restaurant_hours_Ctx.js'
const key = 'availability_ctx$'
export const availability_ctx$_b:B<restaurant_hours_Ctx, typeof key> = be_(key, ctx=>{
	const service_restaurant_hours = service_restaurant_hours$_b(ctx)
	const minute_tick$ = minute_tick$_b(ctx)
	const availability_ctx = derived$(tup(service_restaurant_hours, minute_tick$),
		([service_restaurant_hours, minute_tick])=>{
			return availability_ctx_(service_restaurant_hours, minute_tick)
		})
	return availability_ctx as availability_ctx$_T
})
export type availability_ctx$_T = Readable$<AvailabilityCtx>
