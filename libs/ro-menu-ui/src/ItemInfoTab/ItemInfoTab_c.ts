import { I } from '@ctx-core/combinators'
import { tap_ } from '@ctx-core/function'
import { writable$, Writable$, subscribe_wait_timeout } from '@ctx-core/store'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import {
	params_fireFlyID$_b, params_HeadingID$_b, params_MenuItemID_isNew$_b, params_MasterheadingID$_b, params_MenuItemID$_b,
	navigating_goto_b,
} from '@menus/page'
import {
	API_MENUS_menu_add_b, API_MENUS_menu_add_payload_T, API_MENUS_menu_update_b, API_MENUS_menu_update_payload_T,
	MenuitemAPIRequestQuery, ro_httpClient_b, RoRequestQuery
} from '@menus/ro-http'
import { Path } from '@menus/route'
import { BaseController } from '@menus/shared-ui-lib'
import { getBytesByMb, log } from '@menus/util'
import { RO_ALLOWED_IMG_TYPES, RO_MAX_IMG_SIZE, STATUS_SUCCESS, timeout_ms } from '@menus/web-config'
import { ro_menuitem$_b } from '../ro_menuitem$_b.js'
import { ro_menuitem_is_multisize$_b } from '../ro_menuitem_is_multisize$_b.js'
import { ro_menuitem_is_new_multisize$_b } from '../ro_menuitem_is_new_multisize$_b.js'
import { ro_menuitem_is_new_singlesize$_b } from '../ro_menuitem_is_new_singlesize$_b.js'
import { ro_menuitem_is_new_size_errors$_b } from '../ro_menuitem_is_new_size_errors$_b.js'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { ro_menuitems$_b } from '../ro_menuitems$_b.js'
import { ro_menuoptionsizes$_b } from '../ro_menuoptionsizes$_b.js'
const Controller_name = 'ItemInfoTab_c'
export class ItemInfoTab_c extends BaseController<ro_menu_ui_Ctx> {
	readonly API_MENUS_menu_add = API_MENUS_menu_add_b(this.ctx)
	readonly API_MENUS_menu_update = API_MENUS_menu_update_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly MenuitemDetails_busy$:Writable$<boolean> = writable$(false)
	readonly ro_menuitem_is_multisize$ = ro_menuitem_is_multisize$_b(this.ctx)
	readonly menuitem_image_input$:Writable$<HTMLInputElement> = writable$(null)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly params_HeadingID$ = params_HeadingID$_b(this.ctx)
	readonly params_MenuitemID_IsNew$ = params_MenuItemID_isNew$_b(this.ctx)
	readonly params_MasterheadingID$ = params_MasterheadingID$_b(this.ctx)
	readonly params_menuitemID$ = params_MenuItemID$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly ro_menuitem$ = ro_menuitem$_b(this.ctx)
	readonly ro_menuitem_is_new_multisize$ = ro_menuitem_is_new_multisize$_b(this.ctx)
	readonly ro_Menuitem_is_new_singlesize$ = ro_menuitem_is_new_singlesize$_b(this.ctx)
	readonly ro_menuitem_is_new_size_errors$ = ro_menuitem_is_new_size_errors$_b(this.ctx)
	readonly ro_menuitems$ = ro_menuitems$_b(this.ctx)
	readonly ro_menuoptionsizes$ = ro_menuoptionsizes$_b(this.ctx)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.ro_menuitem$.invalidate()
		this.ro_menuoptionsizes$.invalidate()
		this.ro_menuitem_is_new_multisize$.reset()
		this.ro_Menuitem_is_new_singlesize$.reset()
		this.load_data().then()
	}
	async onDestroy() {
		this.ro_menuitem_is_new_multisize$.reset()
		this.ro_Menuitem_is_new_singlesize$.reset()
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		log(this.ctx, Controller_name, 'load_data()')
		this.busy$.$ = true
		try {
			await subscribe_wait_timeout(this.ro_menuitem$, I, timeout_ms)
			await subscribe_wait_timeout(this.ro_menuoptionsizes$, I, timeout_ms)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly upload_MenuImage = async ()=>{
		log(this.ctx, Controller_name, 'upload_MenuImage')
		const menuitem_image_input = this.menuitem_image_input$.$
		const files_length:number = menuitem_image_input.files.length
		const formData = new FormData()
		// a file was selected
		if (files_length) {
			const file = menuitem_image_input.files.item(0)
			if (!~RO_ALLOWED_IMG_TYPES.indexOf(file.type)) {
				menuitem_image_input.value = ''
				await this.notyf_error('Invalid file format. Only PNG and JPG are allowed.')
			} else if (file.size > getBytesByMb(RO_MAX_IMG_SIZE)) {
				menuitem_image_input.value = ''
				await this.notyf_error(`File size can't be greater then ${RO_MAX_IMG_SIZE}MB.`)
			} else {
				formData.append('file[]', file)
				const requestData = new RoRequestQuery()
				RoRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
				RoRequestQuery.fill_ID(requestData, this.params_menuitemID$.$)
				const payload = await this.ro_httpClient.API_MENUS_image_upload(requestData, formData)
				if (payload.Status === STATUS_SUCCESS) {
					this.ro_menuitem$.refresh({
						FileName: payload.FileName,
						MenuImageExist: true,
					})
					this.ro_menuitems$.invalidate()
				}
				log(this.ctx, Controller_name, 'upload_MenuImage', payload)
			}
		}
	}
	readonly delete_MenuImage = async ()=>{
		log(this.ctx, Controller_name, 'delete_MenuImage')
		this.menuitem_image_input$.update(tap_(menuitem_image_input=>{
			menuitem_image_input.value = ''
		}))
		this.busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			RoRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
			RoRequestQuery.fill_ID(requestData, this.ro_menuitem$.$.ID)
			const payload = await this.ro_httpClient.API_MENUS_image_del(requestData)
			if (payload.Status === STATUS_SUCCESS) {
				this.ro_menuitem$.refresh({
					FileName: null,
					MenuImageExist: null,
				})
				this.ro_menuitems$.invalidate()
			}
			log(this.ctx, Controller_name, 'delete_MenuImage', payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly save = async ()=>{
		log(this.ctx, Controller_name, 'save')
		this.MenuitemDetails_busy$.$ = true
		try {
			const requestData = new MenuitemAPIRequestQuery()
			MenuitemAPIRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
			const ro_menuitem = this.ro_menuitem$.$
			MenuitemAPIRequestQuery.fill_menuitem(requestData, ro_menuitem)
			let payload:API_MENUS_menu_add_payload_T|API_MENUS_menu_update_payload_T
			const params_MenuitemID_IsNew = this.params_MenuitemID_IsNew$.$
			const ro_menuitem_is_multisize = this.ro_menuitem_is_multisize$.$
			if (params_MenuitemID_IsNew) {
				if (ro_menuitem_is_multisize) ro_menuitem.Price = 0
				MenuitemAPIRequestQuery.fill_headID(requestData, this.params_HeadingID$.$)
				payload = await this.API_MENUS_menu_add(requestData)
			} else {
				MenuitemAPIRequestQuery.fill_ID(requestData, ro_menuitem.ID)
				payload = await this.API_MENUS_menu_update(requestData)
			}
			if (payload.Status === STATUS_SUCCESS) {
				if (params_MenuitemID_IsNew) {
					await this.navigating_goto([
						Path.RO.BASE,
						Path.RO.MANAGE_RESTAURANT, this.params_fireFlyID$.$,
						Path.RO.MENU_DETAILS, this.params_MasterheadingID$.$,
						Path.RO.CATEGORY_DETAILS, this.params_HeadingID$.$,
						Path.RO.MENU_ITEM_DETAILS, payload.Data.ID,
						ro_menuitem_is_multisize ? 'size' : 'info'
					])
				}
				await this.notyf_success(`${ro_menuitem.Name} ${params_MenuitemID_IsNew ? 'added' : 'updated'} successfully.`)
			} else {
				await this.notyf_error(`Unable to ${params_MenuitemID_IsNew ? 'add' : 'update'} item, Please try later.`)
			}
			log(this.ctx, Controller_name, 'saveMenuItem', payload)
		} finally {
			this.MenuitemDetails_busy$.$ = false
		}
	}
	readonly onclick_menuitemImage_label = ()=>{
		if (this.params_MenuitemID_IsNew$.$) {
			this.notyf_error('You need to save item info first.').then()
		}
	}
}
