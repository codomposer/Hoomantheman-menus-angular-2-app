import { I } from '@ctx-core/combinators'
import { assign } from '@ctx-core/object'
import { BaseController } from '@menus/shared-ui-lib'
import { subscribe_wait_timeout, Writable$, writable$ } from '@ctx-core/store'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { params_fireFlyID$_b } from '@menus/page'
import {
	API_RESTAURANT_account_info_b, API_RESTAURANT_account_update_b, ro_httpClient_b, RoRequestQuery,
} from '@menus/ro-http'
import type { ro_restaurant_ui_Ctx } from '@menus/ro-restaurant-ui'
import type { RestaurantAccountInformation } from '@menus/ro-shared-models'
import { deep_clone } from '@menus/util'
import { timeout_ms } from '@menus/web-config'
const Controller_name = 'AccountInformationTab_c'
export class AccountInformationTab_c extends BaseController<ro_restaurant_ui_Ctx> {
	readonly API_RESTAURANT_account_info = API_RESTAURANT_account_info_b(this.ctx)
	readonly API_RESTAURANT_account_update = API_RESTAURANT_account_update_b(this.ctx)
	readonly banking_info_editing$:Writable$<boolean> = writable$(false)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly current_restaurant_account_info$:Writable$<RestaurantAccountInformation> = writable$(null)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly restaurant_account_info$:Writable$<RestaurantAccountInformation> = writable$(null)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly save_busy$:Writable$<boolean> = writable$(false)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.load_data().then()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		this.busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			const params_fireFlyID = await subscribe_wait_timeout(this.params_fireFlyID$, I, timeout_ms)
			RoRequestQuery.fill_fireFlyID(requestData, params_fireFlyID)
			const payload = await this.API_RESTAURANT_account_info(requestData)
			this.restaurant_account_info$.$ = payload.Data
			this.update_current_restaurant_account_info()
		} finally {
			this.busy$.$ = false
		}
	}
	readonly toggle_edit = ()=>{
		const banking_info_editing = this.banking_info_editing$.$
		const current_banking_info_editing = this.current_restaurant_account_info$.$
		this.restaurant_account_info$.update(restaurant_account_info=>
			assign(restaurant_account_info,
				banking_info_editing ? {
					LegalName: current_banking_info_editing.LegalName,
					AccountName: current_banking_info_editing.AccountName,
					AccountNumber: current_banking_info_editing.AccountNumber,
					RoutingNumber: current_banking_info_editing.RoutingNumber,
					TIN: current_banking_info_editing.TIN,
					Braintree_Onboard_Status: current_banking_info_editing.Braintree_Onboard_Status,
				} : {
					LegalName: '',
					AccountName: '',
					AccountNumber: '',
					RoutingNumber: '',
					TIN: '',
					Braintree_Onboard_Status: '',
				})
		)
		this.banking_info_editing$.$ = !banking_info_editing
	}
	readonly save = async ()=>{
		this.save_busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			RoRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
			const response = await this.API_RESTAURANT_account_update(
				requestData, this.restaurant_account_info$.$
			)
			if (response.Status === 'success') {
				await this.load_data()
				this.banking_info_editing$.$ = false
				await this.notyf_success('Account Information has been updated.')
			} else {
				await this.notyf_error(response.Message)
			}
		} finally {
			this.save_busy$.$ = false
		}
	}
	readonly update_current_restaurant_account_info = ()=>{
		this.current_restaurant_account_info$.$ = deep_clone(this.restaurant_account_info$.$)
	}
}
