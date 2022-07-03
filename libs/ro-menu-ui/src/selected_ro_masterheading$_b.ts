import { assign, B, be_ } from '@ctx-core/object'
import { refresh_writable_, refresh_writable_T, invalidate_mixin_T, refresh_mixin_T } from '@menus/store'
import type { RoMasterheading_I } from '@menus/ro-shared-models'
import {
	API_MENUS_masterheading_info_payload$_b, success_API_MENUS_masterheading_info_payload_T
} from '@menus/ro-restaurant-ui'
import { url_friendly_names$_b } from '@menus/breadcrumb'
import { Path } from '@menus/route'
import { params_fireFlyID$_b } from '@menus/page'
import type { is_ERR_INVALID_ACCESS$_mixin_T } from '@menus/ro-restaurant'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
const key = 'selected_ro_masterheading$'
export const selected_ro_masterheading$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ctx=>{
	const selected_ro_masterheading$ = refresh_writable_<RoMasterheading_I>(undefined)
	const API_MENUS_masterheading_info_payload$ = API_MENUS_masterheading_info_payload$_b(ctx)
	const params_fireFlyID$ = params_fireFlyID$_b(ctx)
	const url_friendly_names$ = url_friendly_names$_b(ctx)
	const unsubscribers = [
		API_MENUS_masterheading_info_payload$.subscribe(
			API_MENUS_masterheading_info_payload=>{
				const selected_ro_masterheading = (
					API_MENUS_masterheading_info_payload as success_API_MENUS_masterheading_info_payload_T
				)?.Data
				if (selected_ro_masterheading) {
					selected_ro_masterheading$.set(selected_ro_masterheading)
					set_masterhead_url_friendly_names(selected_ro_masterheading)
				} else {
					selected_ro_masterheading$.set(null)
				}
			})
	]
	return assign(selected_ro_masterheading$, {
		onDestroy() {
			unsubscribers.forEach(fn=>fn())
		},
		invalidate: API_MENUS_masterheading_info_payload$.invalidate,
		is_ERR_INVALID_ACCESS$: API_MENUS_masterheading_info_payload$.is_ERR_INVALID_ACCESS$,
	})
	function set_masterhead_url_friendly_names(selected_ro_masterheading:RoMasterheading_I) {
		url_friendly_names$.update(url_friendly_names=>{
			url_friendly_names.set([
					`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}`,
					params_fireFlyID$.$,
					Path.RO.MENU_DETAILS,
					selected_ro_masterheading.ID,
				].join('/'),
				selected_ro_masterheading.Name,
			)
			return url_friendly_names
		})
	}
})
export interface selected_ro_masterheading$_T extends refresh_writable_T<RoMasterheading_I>,
	refresh_mixin_T<RoMasterheading_I>,
	invalidate_mixin_T,
	is_ERR_INVALID_ACCESS$_mixin_T {}
