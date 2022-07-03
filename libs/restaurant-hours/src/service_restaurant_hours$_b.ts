import { B, be_ } from '@ctx-core/object'
import { tup } from '@ctx-core/array'
import { derived$, Readable$ } from '@ctx-core/store'
import { serviceType$_b } from '@menus/service-type'
import type { RestaurantHour_I } from '@menus/restaurant-hours-lib'
import { restaurant_hours$_b } from './restaurant_hours$_b.js'
import { service_restaurant_hours_ } from './service_restaurant_hours_.js'
import type { restaurant_hours_Ctx } from './restaurant_hours_Ctx.js'
const key = 'service_restaurant_hours$'
export const service_restaurant_hours$_b:B<restaurant_hours_Ctx, typeof key> = be_(key, ctx=>{
	const restaurant_hours$ = restaurant_hours$_b(ctx)
	const serviceType$ = serviceType$_b(ctx)
	return derived$(tup(restaurant_hours$, serviceType$),
		([restaurant_hours, serviceType])=>{
			return service_restaurant_hours_(restaurant_hours, serviceType)
		}) as service_restaurant_hours$_T
})
export type service_restaurant_hours$_T = Readable$<RestaurantHour_I[]>
