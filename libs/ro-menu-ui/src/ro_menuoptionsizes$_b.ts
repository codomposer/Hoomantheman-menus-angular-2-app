import { B, be_, assign } from '@ctx-core/object'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { params_fireFlyID$_b, params_MenuItemID$_b } from '@menus/page'
import {
	API_MENUS_menusize_add_payload_T, API_MENUS_menusize_del_payload_T, API_MENUS_menusize_save_payload_T,
	API_MENUS_menusize_update_payload_T, MenuoptionsizeAPIRequestQuery, ro_httpClient_b, RoRequestQuery,
} from '@menus/ro-http'
import type { is_ERR_INVALID_ACCESS$_mixin_T } from '@menus/ro-restaurant'
import { API_MENUS_menusize_list_payload$_b, successAPI_MENUS_menusize_list_payload__T } from '@menus/ro-restaurant-ui'
import type { RoMenuoptionsize_I } from '@menus/ro-shared-models'
import { refresh_writable_, invalidate_mixin_T, refresh_writable_T } from '@menus/store'
import { is_new_o_ } from '@menus/util'
import { STATUS_SUCCESS } from '@menus/web-config'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
import { ro_menuitem$_b } from './ro_menuitem$_b.js'
import { ro_menuitems$_b } from './ro_menuitems$_b.js'
const key = 'ro_menuoptionsizes$'
export const ro_menuoptionsizes$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ctx=>{
	const API_MENUS_menusize_list_payload$ = API_MENUS_menusize_list_payload$_b(ctx)
	const notyf_error = notyf_error_b(ctx)
	const notyf_success = notyf_success_b(ctx)
	const params_fireFlyID$ = params_fireFlyID$_b(ctx)
	const params_MenuItemID$ = params_MenuItemID$_b(ctx)
	const ro_httpClient = ro_httpClient_b(ctx)
	const ro_menuitem$ = ro_menuitem$_b(ctx)
	const ro_menuitems$ = ro_menuitems$_b(ctx)
	const ro_menuoptionsizes$ = refresh_writable_<RoMenuoptionsize_I[]>(undefined)
	const unsubscribers = [
		API_MENUS_menusize_list_payload$.subscribe(API_MENUS_menusize_list_payload=>{
			ro_menuoptionsizes$.$ =
				API_MENUS_menusize_list_payload
				? (API_MENUS_menusize_list_payload as successAPI_MENUS_menusize_list_payload__T).Data
				: typeof params_MenuItemID$.$ === 'number'
					? []
					: null
		})
	]
	return assign(ro_menuoptionsizes$, {
		onDestroy() {
			unsubscribers.forEach(fn=>fn())
		},
		invalidate() {
			API_MENUS_menusize_list_payload$.invalidate()
		},
		is_ERR_INVALID_ACCESS$: API_MENUS_menusize_list_payload$.is_ERR_INVALID_ACCESS$,
		API_MENUS_menusize_save,
		API_MENUS_menusize_del,
		disable_menuitem_when_no_Enabled_ro_menuoptionsizes,
	}) as ro_menuoptionsizes$_T
	async function API_MENUS_menusize_save(ro_menuoptionsize:RoMenuoptionsize_I) {
		const requestData = new MenuoptionsizeAPIRequestQuery()
		MenuoptionsizeAPIRequestQuery.fill_fireFlyID(requestData, params_fireFlyID$.$)
		MenuoptionsizeAPIRequestQuery.fillMenuoptionsize_I(requestData, ro_menuoptionsize)
		MenuoptionsizeAPIRequestQuery.fill_menuitemID(requestData, ro_menuitem$.$.ID)
		let payload:API_MENUS_menusize_add_payload_T|API_MENUS_menusize_update_payload_T
		const is_new = is_new_o_(ro_menuoptionsize)
		if (is_new) {
			payload = await ro_httpClient.API_MENUS_menusize_add(requestData)
		} else {
			MenuoptionsizeAPIRequestQuery.fill_ID(requestData, ro_menuoptionsize.ID)
			payload = await ro_httpClient.API_MENUS_menusize_update(requestData)
		}
		if (payload.Status === STATUS_SUCCESS) {
			if (is_new) {
				assign(ro_menuoptionsize, payload.Data)
			}
			await notyf_success(`${ro_menuoptionsize.Name} ${is_new ? 'added' : 'updated'} successfully.`)
		}
		if (payload.Code === 'ERR_NAME_EXIST') {
			const error_msg = `${ro_menuoptionsize.Name} already exists`
			ro_menuoptionsize.api_errors = [error_msg]
			await notyf_error(error_msg)
		} else {
			ro_menuoptionsize.api_errors = []
		}
		ro_menuoptionsize.api_errors_Name = ro_menuoptionsize.Name
		ro_menuoptionsizes$.refresh()
		disable_menuitem_when_no_Enabled_ro_menuoptionsizes().then()
		return payload
	}
	async function API_MENUS_menusize_del(menuoptionsize_idx, ro_menuoptionsize:RoMenuoptionsize_I) {
		const requestData = new RoRequestQuery()
		RoRequestQuery.fill_fireFlyID(requestData, params_fireFlyID$.$)
		if (ro_menuoptionsize.ID > 0) {
			RoRequestQuery.fill_ID(requestData, ro_menuoptionsize.ID)
		}
		const payload = await ro_httpClient.API_MENUS_menusize_del(requestData)
		if (payload.Status === STATUS_SUCCESS) {
			ro_menuoptionsizes$.update(ro_menuoptionsizes=>{
				ro_menuoptionsizes.splice(menuoptionsize_idx, 1)
				return ro_menuoptionsizes
			})
			await notyf_success(`${ro_menuoptionsize.Name} deleted successfully.`)
		} else {
			await notyf_error(`Unable to delete item, Please try later.`)
		}
		disable_menuitem_when_no_Enabled_ro_menuoptionsizes().then()
		return payload
	}
	async function disable_menuitem_when_no_Enabled_ro_menuoptionsizes() {
		const ro_menuoptionsizes = ro_menuoptionsizes$.$
		if (!ro_menuoptionsizes.some(Menuoptionsize_I=>Menuoptionsize_I.Enabled)) {
			const ro_menuitem = ro_menuitem$.$
			if (ro_menuitem.Enabled) {
				ro_menuitem.Enabled = false
				await ro_menuitems$.API_MENUS_menu_update(ro_menuitem)
			}
		}
	}
})
export interface ro_menuoptionsizes$_T extends refresh_writable_T<RoMenuoptionsize_I[]>,
	invalidate_mixin_T, is_ERR_INVALID_ACCESS$_mixin_T {
	API_MENUS_menusize_save(Menuoptionsize:RoMenuoptionsize_I):
		Promise<API_MENUS_menusize_save_payload_T>
	API_MENUS_menusize_del(
		Menuoptionsize_IIndex, Menuoptionsize:RoMenuoptionsize_I
	):Promise<API_MENUS_menusize_del_payload_T>
}
