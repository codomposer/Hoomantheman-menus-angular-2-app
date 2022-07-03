import { noop } from '@ctx-core/function'
import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$, Unsubscriber } from '@ctx-core/store'
import { params_fireFlyID$_b } from '@menus/page'
import type { RestaurantHours_I } from '@menus/restaurant-hours-lib'
import { restaurant_hours_cache_ctx$_b } from './restaurant_hours_cache_ctx$_b.js'
import type { restaurant_hours_Ctx } from './restaurant_hours_Ctx.js'
const key = 'restaurant_hours$'
export const restaurant_hours$_b:B<restaurant_hours_Ctx, typeof key> = be_(key, ctx=>{
	const restaurant_hours_cache_ctx$ = restaurant_hours_cache_ctx$_b(ctx)
	const params_fireFlyID$ = params_fireFlyID$_b(ctx)
	let unsubscribers:Unsubscriber[] = []
	return derived$(params_fireFlyID$, (params_fireFlyID, set)=>{
		const restaurant_hours$ = restaurant_hours_cache_ctx$.be(params_fireFlyID)
		unsubscribers.forEach(u=>u())
		unsubscribers = [
			derived$(restaurant_hours$, restaurant_hours=>{
				set(restaurant_hours)
			}).subscribe(noop)
		]
	}) as restaurant_hours$_T
})
export type restaurant_hours$_T = Readable$<RestaurantHours_I>
