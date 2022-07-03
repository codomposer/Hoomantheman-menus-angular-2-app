import { assign, B, be_ } from '@ctx-core/object'
import { Writable$ } from '@ctx-core/store'
import { refresh_writable_, invalidate_mixin_T, refresh_mixin_T } from '@menus/store'
import type { RoHeading_I } from '@menus/ro-shared-models'
import { is_ERR_INVALID_ACCESS$_mixin_T, is_ERR_INVALID_ACCESS$_T } from '@menus/ro-restaurant'
import { API_MENUS_heading_list_payload$_b } from './API_MENUS_heading_list_payload$_b.js'
import type { ro_restaurant_ui_Ctx } from './ro_restaurant_ui_Ctx.js'
const key = 'heading_list$'
export const heading_list$_b:B<ro_restaurant_ui_Ctx, typeof key> = be_(key, ctx=>{
	const heading_list$ = refresh_writable_<RoHeading_I[]>(null)
	const API_MENUS_heading_list_payload$ = API_MENUS_heading_list_payload$_b(ctx)
	const unsubscribers = [
		API_MENUS_heading_list_payload$.subscribe(API_MENUS_heading_list_payload=>{
			const heading_list = API_MENUS_heading_list_payload?.Data
			if (heading_list) {
				heading_list$.$ = heading_list
			} else {
				heading_list$.$ = null
			}
		})
	]
	return assign(heading_list$, {
		onDestroy() {
			unsubscribers.forEach(fn=>fn())
		},
		invalidate: API_MENUS_heading_list_payload$.invalidate,
		is_ERR_INVALID_ACCESS$: API_MENUS_heading_list_payload$.is_ERR_INVALID_ACCESS$,
	}) as heading_list$_T
})
export interface heading_list$_T extends Writable$<RoHeading_I[]>,
	refresh_mixin_T<RoHeading_I[]>,
	invalidate_mixin_T,
	is_ERR_INVALID_ACCESS$_mixin_T {
	invalidate():void
	is_ERR_INVALID_ACCESS$:is_ERR_INVALID_ACCESS$_T
}
