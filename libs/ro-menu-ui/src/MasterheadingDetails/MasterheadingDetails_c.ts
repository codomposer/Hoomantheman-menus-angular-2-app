import { I } from '@ctx-core/combinators'
import { no_dom } from '@ctx-core/dom'
import { writable$, subscribe_wait_timeout, Writable$ } from '@ctx-core/store'
import type { Sortable_itemclick_evt_T, Sortable_sort_evt_T } from '@menus/dnd'
import type { CheckBox_change_evt_T } from '@menus/form-ui'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { params_fireFlyID$_b, params_MasterheadingID$_b, navigating_goto_b } from '@menus/page'
import {
	API_MENUS_heading_sort_body_T, ro_httpClient_b, RoRequestQuery, saveMasterheading_data_T
} from '@menus/ro-http'
import { ro_restaurant$_b } from '@menus/ro-restaurant'
import { heading_list$_b, subscribe_ERR_INVALID_ACCESS_b } from '@menus/ro-restaurant-ui'
import { RoHeading_I, set_list_SortID, } from '@menus/ro-shared-models'
import { Path } from '@menus/route'
import { BaseController, confirmModal$_b } from '@menus/shared-ui'
import { SORT_ERROR_MSG, SortDetail } from '@menus/sort-shared'
import { log } from '@menus/util'
import { STATUS_SUCCESS, MENUS_TAB, timeout_ms } from '@menus/web-config'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { selected_ro_masterheading$_b } from '../selected_ro_masterheading$_b.js'
import type { SaveHeadModal_additem_evt_T, SaveHeadModal_I } from '../SaveHeadModal/index.js'
import type { SaveScheduleModal_I } from '../SaveScheduleModal/index.js'
const Controller_name = 'MasterheadingDetails_c'
export class MasterheadingDetails_c extends BaseController<ro_menu_ui_Ctx> {
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly confirmModal$ = confirmModal$_b(this.ctx)
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly heading_list$ = heading_list$_b(this.ctx)
	readonly selected_ro_masterheading$ = selected_ro_masterheading$_b(this.ctx)
	readonly params_MasterheadingID$ = params_MasterheadingID$_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly ro_restaurant$ = ro_restaurant$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly saveHeadModal$:Writable$<SaveHeadModal_I> = writable$(undefined)
	readonly saveScheduleModal$:Writable$<SaveScheduleModal_I> = writable$(undefined)
	readonly subscribe_ERR_INVALID_ACCESS = subscribe_ERR_INVALID_ACCESS_b(this.ctx)
	async onMount() {
		if (no_dom) return
		await super.onMount()
		this.ctx[Controller_name] = this
		this.heading_list$.invalidate()
		this.selected_ro_masterheading$.invalidate()
		this.ro_restaurant$.invalidate()
		this.unsubscribers.push(
			this.subscribe_ERR_INVALID_ACCESS(
				this.heading_list$.is_ERR_INVALID_ACCESS$, Controller_name
			),
			this.subscribe_ERR_INVALID_ACCESS(
				this.selected_ro_masterheading$.is_ERR_INVALID_ACCESS$, Controller_name
			),
			this.subscribe_ERR_INVALID_ACCESS(
				this.ro_restaurant$.is_ERR_INVALID_ACCESS$, Controller_name
			)
		)
		this.load_data().then()
	};
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		log(this.ctx, Controller_name, 'load_data()')
		this.busy$.$ = true
		try {
			await Promise.all([
				subscribe_wait_timeout(this.selected_ro_masterheading$, I, timeout_ms),
				subscribe_wait_timeout(this.heading_list$, I, timeout_ms),
			])
		} finally {
			this.busy$.$ = false
		}
	}
	public readonly onsort_heading_list = async (evt:Sortable_sort_evt_T<RoHeading_I[]>)=>{
		const heading_list = evt.detail.out_list
		log(this.ctx, Controller_name, 'onsort_heading_list', evt, heading_list)
		set_list_SortID(heading_list)
		const rollback_value = this.heading_list$.$
		this.heading_list$.$ = heading_list
		const rollback = ()=>{
			this.notyf_error(SORT_ERROR_MSG)
			this.heading_list$.$ = rollback_value
		}
		try {
			const requestData = new RoRequestQuery()
			RoRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
			const body = {
				SortDetails: []
			} as API_MENUS_heading_sort_body_T
			for (const head of this.heading_list$.$) {
				if (head.ID > 0) {
					body.SortDetails.push({
						ID: head.ID,
						SortID: head.SortID,
					} as SortDetail)
				}
			}
			const payload = await this.ro_httpClient.API_MENUS_heading_sort(requestData, body)
			if (payload.Status !== 'success') {
				rollback()
			}
			log(this.ctx, Controller_name, 'API_MENUS_heading_sort', payload)
		} catch (err) {
			rollback()
			throw err
		}
	}
	readonly open_saveScheduleModal = async ()=>{
		await this.saveScheduleModal$.$.open({
			fireFlyID: this.params_fireFlyID$.$,
			ro_masterheading: this.selected_ro_masterheading$.$,
		})
	}
	readonly openSaveHeadModal = async (head?:RoHeading_I)=>{
		await this.saveHeadModal$.$.open({
			fireFlyID: this.params_fireFlyID$.$,
			MasterheadingID: this.params_MasterheadingID$.$,
			head,
		})
		this.heading_list$.refresh()
	}
	readonly onchange_masterheading_Enabled = async ()=>{
		const selected_ro_masterheading = this.selected_ro_masterheading$.$
		this.busy$.$ = true
		try {
			const data:saveMasterheading_data_T = {
				fireFlyID: this.params_fireFlyID$.$,
				ro_masterheading: selected_ro_masterheading,
			}
			const payload = await this.ro_httpClient.save_API_MENUS_masterheading(data)
			if (payload.Status === STATUS_SUCCESS) {
				this.notyf_success(`${selected_ro_masterheading.Name} updated successfully.`)
			} else {
				this.notyf_error('Unable to update item, Please try later.')
			}
			log(this.ctx, Controller_name, 'updateMasterheading', payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly onchange_head_Enabled = async (evt:CheckBox_change_evt_T, head:RoHeading_I)=>{
		log(this.ctx, Controller_name, 'onchange_head_Enabled()')
		head.Enabled = evt.detail as boolean
		this.heading_list$.refresh()
		this.busy$.$ = true
		try {
			const data = {
				fireFlyID: this.params_fireFlyID$.$,
				MasterheadingID: this.params_MasterheadingID$.$,
				head,
			}
			const payload = await this.ro_httpClient.save_API_MENUS_heading(data)
			if (payload.Status === STATUS_SUCCESS) {
				this.notyf_success(`${head.Name} updated successfully.`)
			} else {
				this.notyf_error('Unable to update item, Please try later.')
			}
			log(this.ctx, Controller_name, 'save_API_MENUS_heading', payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly onadditem__SaveHeadModal = (evt:SaveHeadModal_additem_evt_T)=>{
		const head = evt.detail
		const heading_list = this.heading_list$.$
		heading_list.push(head)
		this.heading_list$.$ = heading_list
		log(this.ctx, Controller_name, 'saveHeadModalEvents', evt)
	}
	readonly deleteHead = async (headIndex:number, head:RoHeading_I)=>{
		const confirm = await this.confirmModal$.$.open({
			message: `Are you sure you want to delete ${head.Name}?`,
		})
		if (confirm) {
			log(this.ctx, Controller_name, 'deleteHead()')
			this.busy$.$ = true
			try {
				const requestData = new RoRequestQuery()
				RoRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
				RoRequestQuery.fill_ID(requestData, head.ID)
				const payload = await this.ro_httpClient.API_MENUS_heading_del(requestData)
				if (payload.Status === STATUS_SUCCESS) {
					const heading_list = this.heading_list$.$
					heading_list.splice(headIndex, 1)
					this.heading_list$.$ = heading_list
				} else {
					this.notyf_error('Unable to delete item, Please try later.')
				}
				log(this.ctx, Controller_name, 'deleteHead', payload)
			} finally {
				this.busy$.$ = false
			}
		}
	}
	readonly goto_headDetails = async (evt:Sortable_itemclick_evt_T<RoHeading_I>)=>{
		const { item: head } = evt.detail
		await this.navigating_goto([
			`${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}`,
			this.params_fireFlyID$.$,
			Path.RO.MENU_DETAILS,
			this.params_MasterheadingID$.$,
			Path.RO.CATEGORY_DETAILS,
			head.ID
		])
	}
	readonly goBack = async ()=>{
		await this.navigating_goto([
			Path.RO.BASE,
			Path.RO.MANAGE_RESTAURANT,
			this.params_fireFlyID$.$,
			MENUS_TAB,
		])
		log(this.ctx, Controller_name, 'goBack')
	}
}
