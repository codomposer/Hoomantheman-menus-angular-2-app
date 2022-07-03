import { I } from '@ctx-core/combinators'
import { subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import type { Sortable_click_item_evt_T, Sortable_sort_evt_T } from '@menus/dnd'
import type { CheckBox_change_evt_T } from '@menus/form-ui'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { navigating_goto_b, params_fireFlyID$_b } from '@menus/page'
import { ro_httpClient_b, RoRequestQuery, success_API_MENUS_masterheading_list_payload_T } from '@menus/ro-http'
import { API_MENUS_masterheading_list_payload$_b, subscribe_ERR_INVALID_ACCESS_b } from '@menus/ro-restaurant-ui'
import { RoMasterheading_I, set_list_SortID } from '@menus/ro-shared-models'
import { Path } from '@menus/route'
import { SORT_ERROR_MSG } from '@menus/sort-shared'
import { BaseController, confirmModal$_b } from '@menus/shared-ui'
import { log } from '@menus/util'
import { STATUS_SUCCESS, timeout_ms } from '@menus/web-config'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import type { SaveMasterheadingModal_additem_evt_T, SaveMasterheadingModal_I, } from '../SaveMasterheadingModal/index.js'
import type { SaveScheduleModal_I } from '../SaveScheduleModal/index.js'
import { ro_masterheadings$_b } from '../ro_masterheadings$_b'
const Controller_name = 'MenusTab_c'
export class MenusTab_c extends BaseController<ro_menu_ui_Ctx> {
	readonly API_MENUS_masterheading_list_payload$ = API_MENUS_masterheading_list_payload$_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly busy_text$:Writable$<string> = writable$(null)
	readonly confirmModal$ = confirmModal$_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly ro_masterheadings$ = ro_masterheadings$_b(this.ctx)
	readonly saveMasterheadingModal$:Writable$<SaveMasterheadingModal_I> = writable$(null)
	readonly saveScheduleModal$:Writable$<SaveScheduleModal_I> = writable$(null)
	readonly subscribe_ERR_INVALID_ACCESS = subscribe_ERR_INVALID_ACCESS_b(this.ctx)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.unsubscribers.push(
			this.params_fireFlyID$.subscribe(this.load_menusTab),
			this.subscribe_ERR_INVALID_ACCESS(
				this.API_MENUS_masterheading_list_payload$.is_ERR_INVALID_ACCESS$, Controller_name
			)
		)
	};
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_menusTab = async ()=>{
		log(this.ctx, Controller_name, 'load_menusTab()')
		if (!this.params_fireFlyID$.$) return
		this.busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			requestData.ff = this.params_fireFlyID$.$
			const API_RESTAURANT_status_payload = await this.ro_httpClient.API_RESTAURANT_status(requestData)
			if (API_RESTAURANT_status_payload.Status === STATUS_SUCCESS) {
				const restaurant = API_RESTAURANT_status_payload.Data
				if (restaurant.EnableOnlineOrdering) {
					const API_MENUS_masterheading_list_payload = await subscribe_wait_timeout(
						this.API_MENUS_masterheading_list_payload$, I, timeout_ms
					)
					if (API_MENUS_masterheading_list_payload.Status === STATUS_SUCCESS) {
						this.ro_masterheadings$.$ = (
							API_MENUS_masterheading_list_payload as success_API_MENUS_masterheading_list_payload_T
						).Data
					}
					log(this.ctx, Controller_name, 'API_MENUS_masterheading_list_payload$', API_MENUS_masterheading_list_payload)
				}
			}
			log(this.ctx, Controller_name, 'API_RESTAURANT_status_payload', API_RESTAURANT_status_payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly onadditem_saveMasterheadingModal = (event:SaveMasterheadingModal_additem_evt_T)=>{
		const ro_masterheading = event.detail
		this.ro_masterheadings$.update(ro_masterheadings=>{
			if (!ro_masterheadings) ro_masterheadings = []
			ro_masterheadings.push(ro_masterheading)
			return ro_masterheadings
		})
		log(this.ctx, Controller_name, 'onadditem_saveMasterheadingModal', event)
	}
	readonly delete_masterHead = async (masterHeadIndex, ro_masterheading:RoMasterheading_I)=>{
		const confirm = await this.confirmModal$.$.open({
			message: `Are you sure you want to delete ${ro_masterheading.Name}?`,
		})
		if (confirm) {
			log(this.ctx, Controller_name, 'delete_masterHead()')
			this.busy$.$ = true
			try {
				const requestData = new RoRequestQuery()
				RoRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
				RoRequestQuery.fill_ID(requestData, ro_masterheading.ID)
				const payload = await this.ro_httpClient.API_MENUS_masterheading_del(requestData)
				if (payload.Status === STATUS_SUCCESS) {
					this.ro_masterheadings$.update(ro_masterheadings=>{
						ro_masterheadings.splice(masterHeadIndex, 1)
						return ro_masterheadings
					})
				} else {
					this.notyf_error('Unable to delete item, Please try later.')
				}
				log(this.ctx, Controller_name, 'delete_masterHead', payload)
			} finally {
				this.busy$.$ = false
			}
		}
		log(this.ctx, Controller_name, 'confirmModal', 'promise', confirm)
	}
	readonly onchange_masterHead_Enabled = async (evt:CheckBox_change_evt_T, ro_masterheading:RoMasterheading_I)=>{
		log(this.ctx, Controller_name, 'onchange_masterHead_Enabled', ro_masterheading)
		ro_masterheading.Enabled = evt.detail as boolean
		// menusTab has ro_masterheading
		this.busy$.$ = true
		try {
			const payload = await this.ro_httpClient.save_API_MENUS_masterheading({
				fireFlyID: this.params_fireFlyID$.$,
				ro_masterheading,
			})
			if (payload.Status === STATUS_SUCCESS) {
				this.notyf_success(`${ro_masterheading.Name} updated successfully.`)
			} else {
				this.notyf_error('Unable to update item, Please try later.')
			}
			log(this.ctx, Controller_name, 'updateMasterheading', payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly open_saveScheduleModal = async (ro_masterheading:RoMasterheading_I)=>{
		await this.saveScheduleModal$.$.open({
			fireFlyID: this.params_fireFlyID$.$,
			ro_masterheading,
		})
	}
	readonly onsort_masterheadings = async (evt:Sortable_sort_evt_T<RoMasterheading_I[]>)=>{
		const ro_masterheadings = evt.detail.out_list
		log(this.ctx, Controller_name, 'onsort_masterheadings', evt, ro_masterheadings)
		const rollback_value = this.ro_masterheadings$.$
		set_list_SortID(ro_masterheadings)
		this.ro_masterheadings$.$ = ro_masterheadings
		const rollback = ()=>{
			this.notyf_error(SORT_ERROR_MSG)
			this.ro_masterheadings$.$ = rollback_value
		}
		try {
			const requestData = new RoRequestQuery()
			RoRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
			const body = {
				SortDetails: []
			}
			for (const ro_masterheading of ro_masterheadings) {
				if (ro_masterheading.ID > 0) {
					body.SortDetails.push({
						ID: ro_masterheading.ID,
						SortID: ro_masterheading.SortID,
					})
				}
			}
			const payload = await this.ro_httpClient.API_MENUS_masterheading_sort(requestData, body)
			if (payload.Status !== 'success') {
				rollback()
			}
			log(this.ctx, Controller_name, 'API_MENUS_masterheading_sort', payload)
		} catch (err) {
			rollback()
			throw err
		}
	}
	readonly open_saveMasterheadingModal = async (ro_masterheading?:RoMasterheading_I)=>{
		const out_masterHead = await this.saveMasterheadingModal$.$.open({
			fireFlyID: this.params_fireFlyID$.$,
			ro_masterheading,
		})
		if (out_masterHead) {
			this.ro_masterheadings$.refresh()
		}
	}
	readonly onitemclick_masterheadings = async (evt:Sortable_click_item_evt_T<RoMasterheading_I>)=>{
		const ro_masterheading = evt.detail.item
		await this.navigating_goto([
			`${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}`,
			this.params_fireFlyID$.$,
			Path.RO.MENU_DETAILS,
			ro_masterheading.ID,
		])
	}
}
