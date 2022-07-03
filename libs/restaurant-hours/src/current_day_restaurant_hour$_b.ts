import { B, be_ } from '@ctx-core/object'
import { tup } from '@ctx-core/array'
import { derived$, Readable$ } from '@ctx-core/store'
import { minute_tick$_b } from '@menus/date'
import type { RestaurantHour_I } from '@menus/restaurant-hours-lib'
import { service_restaurant_hours$_b } from './service_restaurant_hours$_b.js'
import { current_day_restaurant_hour_ } from './current_day_restaurant_hour_.js'
import type { restaurant_hours_Ctx } from './restaurant_hours_Ctx.js'
const key = 'current_day_restaurant_hour$'
export const current_day_restaurant_hour$_b:B<restaurant_hours_Ctx, typeof key> = be_(key, ctx=>{
	const service_restaurant_hours$ = service_restaurant_hours$_b(ctx)
	const minute_tick$ = minute_tick$_b(ctx)
	const current_day_restaurant_hour$ = derived$(tup(service_restaurant_hours$, minute_tick$),
		([service_restaurant_hours, minute_tick])=>{
			return current_day_restaurant_hour_(service_restaurant_hours, minute_tick)
		})
	return current_day_restaurant_hour$
})
export type current_day_restaurant_hour$_T = Readable$<RestaurantHour_I>
