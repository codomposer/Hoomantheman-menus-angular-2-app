import { assign, B, be_ } from '@ctx-core/object'
import { url_friendly_names$_b } from '@menus/breadcrumb'
import { params_fireFlyID$_b, params_MasterheadingID$_b } from '@menus/page'
import type { is_ERR_INVALID_ACCESS$_mixin_T } from '@menus/ro-restaurant'
import { API_MENUS_heading_info_payload$_b } from '@menus/ro-restaurant-ui'
import type { RoHeading_I } from '@menus/ro-shared-models'
import { Path } from '@menus/route'
import { refresh_writable_, invalidate_mixin_T, refresh_writable_T } from '@menus/store'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
const key = 'ro_heading$'
export const ro_heading$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ctx=>{
	const ro_heading$ = refresh_writable_<RoHeading_I>(undefined)
	const API_MENUS_heading_info_payload$ = API_MENUS_heading_info_payload$_b(ctx)
	const url_friendly_names$ = url_friendly_names$_b(ctx)
	const params_fireFlyID$ = params_fireFlyID$_b(ctx)
	const params_MasterheadingID$ = params_MasterheadingID$_b(ctx)
	const unsubscribers = [
		API_MENUS_heading_info_payload$.subscribe(API_MENUS_masterheading_info_payload=>{
			const ro_heading = API_MENUS_masterheading_info_payload?.Data
			if (ro_heading) {
				ro_heading$.$ = ro_heading
				set_head_url_friendly_names(ro_heading)
			} else {
				ro_heading$.$ = null
			}
		})
	]
	return assign(ro_heading$, {
		onDestroy() {
			unsubscribers.forEach(fn=>fn())
		},
		invalidate() {
			API_MENUS_heading_info_payload$.invalidate()
		},
		is_ERR_INVALID_ACCESS$: API_MENUS_heading_info_payload$.is_ERR_INVALID_ACCESS$,
		set_head_url_friendly_names,
	})
	async function set_head_url_friendly_names(ro_heading:RoHeading_I) {
		url_friendly_names$.update(url_friendly_names=>{
			url_friendly_names.set([
					`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}`,
					params_fireFlyID$.$,
					Path.RO.MENU_DETAILS,
					params_MasterheadingID$.$,
					Path.RO.CATEGORY_DETAILS,
					ro_heading.ID,
				].join('/'),
				ro_heading.Name
			)
			return url_friendly_names
		})
	}
})
export interface ro_heading$_T
	extends refresh_writable_T<RoHeading_I>,
		invalidate_mixin_T, is_ERR_INVALID_ACCESS$_mixin_T {
	invalidate():void
}
