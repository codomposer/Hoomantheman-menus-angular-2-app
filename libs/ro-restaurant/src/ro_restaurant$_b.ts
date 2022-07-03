import { assign, B, be_ } from '@ctx-core/object'
import { Writable$, Unsubscriber } from '@ctx-core/store'
import { url_friendly_names$_b, url_regex_friendly_names$_b } from '@menus/breadcrumb'
import { params_fireFlyID$_b } from '@menus/page'
import { Path } from '@menus/route'
import { refresh_writable_, invalidate_mixin_T, refresh_writable_T } from '@menus/store'
import {
	API_RESTAURANT_info_payload$_b, success_API_RESTAURANT_info_payload_T
} from './API_RESTAURANT_info_payload$_b.js'
import type { is_ERR_INVALID_ACCESS$_T, is_ERR_INVALID_ACCESS$_mixin_T } from './is_ERR_INVALID_ACCESS$_.js'
import type { ro_restaurant_Ctx } from './ro_restaurant_Ctx.js'
import { RoRestaurant } from './RoRestaurant.js'
import type { RoRestaurant_I } from './RoRestaurant_I.js'
const key = 'ro_restaurant$'
export const ro_restaurant$_b:B<ro_restaurant_Ctx, typeof key> = be_(key, function (ctx) {
	const API_RESTAURANT_info_payload$ = API_RESTAURANT_info_payload$_b(ctx)
	const params_fireFlyID$ = params_fireFlyID$_b(ctx)
	const url_friendly_names$ = url_friendly_names$_b(ctx)
	const url_regex_friendly_names$ = url_regex_friendly_names$_b(ctx)
	const unsubscribers:Unsubscriber[] = []
	const ro_restaurant$ = assign(
		refresh_writable_<RoRestaurant_I>(new RoRestaurant()), {
			onDestroy: ()=>unsubscribers.forEach(fn=>fn()),
			invalidate: ()=>API_RESTAURANT_info_payload$.invalidate(),
			is_ERR_INVALID_ACCESS$: API_RESTAURANT_info_payload$.is_ERR_INVALID_ACCESS$,
		}) as ro_restaurant$_T
	unsubscribers.push(
		API_RESTAURANT_info_payload$.subscribe(API_RESTAURANT_info_payload=>{
			const ro_restaurant = (API_RESTAURANT_info_payload as success_API_RESTAURANT_info_payload_T)?.Data
			if (ro_restaurant) {
				ro_restaurant$.$ = ro_restaurant
				set_restaurant_url_friendly_names(ro_restaurant)
			} else {
				ro_restaurant$.$ = null
			}
		})
	)
	return ro_restaurant$
	function set_restaurant_url_friendly_names(ro_restaurant:RoRestaurant_I) {
		const params_fireFlyID = params_fireFlyID$.$
		url_friendly_names$.update(url_friendly_names=>{
			url_friendly_names.set([
					'', Path.RO.BASE, Path.RO.MANAGE_RESTAURANT, params_fireFlyID,
				].join('/'),
				ro_restaurant.Name
			)
			return url_friendly_names
		})
		url_regex_friendly_names$.update(url_regex_friendly_names=>{
			url_regex_friendly_names.set(
				new RegExp(`
/$
{Path.RO.BASE}
/$
{Path.RO.MANAGE_RESTAURANT}
/$
{$fireFlyID}
[A-Za-z0-9\?=&]+$
`),
				ro_restaurant.Name,
			)
			return url_regex_friendly_names
		})
	}
})
export interface ro_restaurant$_T extends Writable$<RoRestaurant_I>,
	refresh_writable_T<RoRestaurant_I>,
	invalidate_mixin_T,
	is_ERR_INVALID_ACCESS$_mixin_T {
	onDestroy:()=>void
	invalidate():void
	is_ERR_INVALID_ACCESS$:is_ERR_INVALID_ACCESS$_T
}
