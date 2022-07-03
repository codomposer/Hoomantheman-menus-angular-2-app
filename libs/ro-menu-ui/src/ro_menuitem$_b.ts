import { B, be_, assign } from '@ctx-core/object'
import type { Writable$ } from '@ctx-core/store'
import { url_friendly_names$_b } from '@menus/breadcrumb'
import { params_fireFlyID$_b, params_HeadingID$_b, params_MasterheadingID$_b, params_MenuItemID$_b } from '@menus/page'
import { API_MENUS_menu_info_payload$_b, success_API_MENUS_menu_info_payload_T } from '@menus/ro-restaurant-ui'
import { RoMenuitem, RoMenuitem_I, show_in_gallery_requires_image_error_msg } from '@menus/ro-shared-models'
import { Path } from '@menus/route'
import { refresh_writable_, invalidate_mixin_T, refresh_mixin_T } from '@menus/store'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
const key = 'ro_menuitem$'
export const ro_menuitem$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ctx=>{
	const ro_menuitem$ = refresh_writable_<RoMenuitem_I>(null)
	const params_fireFlyID$ = params_fireFlyID$_b(ctx)
	const params_HeadingID$ = params_HeadingID$_b(ctx)
	const params_MasterheadingID$ = params_MasterheadingID$_b(ctx)
	const params_MenuItemID$ = params_MenuItemID$_b(ctx)
	const url_friendly_names$ = url_friendly_names$_b(ctx)
	const API_MENUS_menu_info_payload$ = API_MENUS_menu_info_payload$_b(ctx)
	ro_menuitem$.subscribe(ro_menuitem=>{
		if (ro_menuitem) {
			ro_menuitem.ShowImageInGallery_errors =
				(!ro_menuitem.MenuImageExist && ro_menuitem.ShowImageInGallery)
				? [show_in_gallery_requires_image_error_msg]
				: []
		}
	})
	params_MenuItemID$.subscribe(params_MenuItemID=>{
		if (params_MenuItemID === 0) {
			ro_menuitem$.set(new RoMenuitem())
		}
	})
	API_MENUS_menu_info_payload$.subscribe(API_MENUS_menu_info_payload=>{
		if (params_MenuItemID$.$ === 0) return
		const ro_menuitem = (
			API_MENUS_menu_info_payload as success_API_MENUS_menu_info_payload_T
		)?.Data
		if (ro_menuitem) {
			ro_menuitem$.set(ro_menuitem)
			set_ro_restaurant_url_friendly_names(ro_menuitem)
		} else {
			ro_menuitem$.set(null)
		}
	})
	return assign(ro_menuitem$, {
		invalidate() {
			API_MENUS_menu_info_payload$.invalidate()
		},
	}) as ro_menuitem$_T
	function set_ro_restaurant_url_friendly_names(ro_menuitem:RoMenuitem_I) {
		url_friendly_names$.update(url_friendly_names=>{
			url_friendly_names.set([
					`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}`,
					params_fireFlyID$.$,
					Path.RO.MENU_DETAILS,
					params_MasterheadingID$.$,
					Path.RO.CATEGORY_DETAILS,
					params_HeadingID$.$,
					Path.RO.MENU_ITEM_DETAILS,
					ro_menuitem.ID,
				].join('/'),
				ro_menuitem.Name,
			)
			return url_friendly_names
		})
	}
})
export interface ro_menuitem$_T extends Writable$<RoMenuitem_I>, refresh_mixin_T<RoMenuitem_I>, invalidate_mixin_T {}
