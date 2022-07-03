import { assign, B, be_ } from '@ctx-core/object'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { params_fireFlyID$_b } from '@menus/page'
import {
	API_MENUS_menu_del_b, API_MENUS_menu_del_payload_T, API_MENUS_menu_update_b, API_MENUS_menu_update_payload_T,
	MenuitemAPIRequestQuery, RoRequestQuery
} from '@menus/ro-http'
import type { is_ERR_INVALID_ACCESS$_mixin_T } from '@menus/ro-restaurant'
import { API_MENUS_menu_list_payload$_b, success_API_MENUS_menu_list_payload_T } from '@menus/ro-restaurant-ui'
import type { RoMenuitem_I } from '@menus/ro-shared-models'
import { refresh_writable_, invalidate_mixin_T, refresh_writable_T } from '@menus/store'
import { STATUS_SUCCESS } from '@menus/web-config'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
import { show_in_gallery_requires_image_error_msg } from '@menus/ro-shared-models'
const key = 'ro_menuitems$'
export const ro_menuitems$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ctx=>{
	const ro_menuitems$ = refresh_writable_<RoMenuitem_I[]>(undefined)
	const API_MENUS_menu_list_payload$ = API_MENUS_menu_list_payload$_b(ctx)
	const in_API_MENUS_menu_del = API_MENUS_menu_del_b(ctx)
	const in_API_MENUS_menu_update = API_MENUS_menu_update_b(ctx)
	const notyf_success = notyf_success_b(ctx)
	const notyf_error = notyf_error_b(ctx)
	const params_fireFlyID$ = params_fireFlyID$_b(ctx)
	const unsubscribers = [
		API_MENUS_menu_list_payload$.subscribe(API_MENUS_menu_list_payload=>{
			const ro_menuitems = (
				API_MENUS_menu_list_payload as success_API_MENUS_menu_list_payload_T
			)?.Data
			if (ro_menuitems) {
				ro_menuitems$.$ = ro_menuitems
			} else {
				ro_menuitems$.$ = null
			}
		})
	]
	return assign(ro_menuitems$, {
		onDestroy() {
			unsubscribers.forEach(fn=>fn())
		},
		invalidate: API_MENUS_menu_list_payload$.invalidate,
		is_ERR_INVALID_ACCESS$: API_MENUS_menu_list_payload$.is_ERR_INVALID_ACCESS$,
		API_MENUS_menu_del,
		API_MENUS_menu_update,
	}) as ro_menuitems$_T
	async function API_MENUS_menu_del(ro_menuitem:RoMenuitem_I) {
		const requestData = new RoRequestQuery()
		RoRequestQuery.fill_fireFlyID(requestData, params_fireFlyID$.$)
		RoRequestQuery.fill_ID(requestData, ro_menuitem.ID)
		const payload = await in_API_MENUS_menu_del(requestData)
		if (payload.Status === STATUS_SUCCESS) {
			const ro_menuitems = ro_menuitems$.$
			const ro_menuitem_idx = ro_menuitems.indexOf(ro_menuitem)
			ro_menuitems.splice(ro_menuitem_idx, 1)
			ro_menuitems$.set(ro_menuitems)
		} else {
			const delete_error_msg = 'Unable to delete item, Please try later.'
			await notyf_error(delete_error_msg)
			ro_menuitem.delete_errors = [delete_error_msg]
			ro_menuitems$.refresh()
		}
		return payload
	}
	async function API_MENUS_menu_update(ro_menuitem:RoMenuitem_I) {
		const requestData = new MenuitemAPIRequestQuery()
		MenuitemAPIRequestQuery.fill_fireFlyID(requestData, params_fireFlyID$.$)
		MenuitemAPIRequestQuery.fill_ID(requestData, ro_menuitem.ID)
		MenuitemAPIRequestQuery.fill_menuitem(requestData, ro_menuitem)
		const payload = await in_API_MENUS_menu_update(requestData)
		if (payload.Status === STATUS_SUCCESS) {
			await notyf_success(`${ro_menuitem.Name} updated successfully.`)
			ro_menuitem.ShowImageInGallery_errors = []
			ro_menuitem.update_errors = []
		} else {
			if (payload.Code === 'ERR_SHOWIMAGEINGALLERY') {
				await notyf_error(show_in_gallery_requires_image_error_msg)
				ro_menuitem.ShowImageInGallery = false
				ro_menuitem.ShowImageInGallery_errors = [show_in_gallery_requires_image_error_msg]
			} else {
				const update_error_msg = 'Unable to update item, Please try later.'
				await notyf_error(update_error_msg)
				ro_menuitem.update_errors = [update_error_msg]
			}
		}
		ro_menuitems$.refresh()
		return payload
	}
})
export interface ro_menuitems$_T extends refresh_writable_T<RoMenuitem_I[]>,
	invalidate_mixin_T, is_ERR_INVALID_ACCESS$_mixin_T {
	API_MENUS_menu_del(ro_menuitem:RoMenuitem_I):Promise<API_MENUS_menu_del_payload_T>
	API_MENUS_menu_update(ro_menuitem:RoMenuitem_I):Promise<API_MENUS_menu_update_payload_T>
	invalidate():void
}
