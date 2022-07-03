import { neql_, not } from '@ctx-core/function'
import { I } from '@ctx-core/combinators'
import { subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { log } from '@menus/util'
import { navigating_goto_b } from '@menus/page'
import { page_query$_b, Query } from '@ctx-core/sapper'
import type { SoldOutAction } from '@menus/consumer-user-common'
import {
	consumer_login_user$_b, ChangePassword, ChangePasswordAPIRequestQuery, SoldOutActionAPIRequestQuery,
	consumer_login_user$_T, UserAPIRequestQuery, User,
} from '@menus/consumer-user-common'
import { consumer_http_client_b, get_app_settings_payload_T, get_userAddresses_payload_T, goto_login_b } from '@menus/consumer-http'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { open_modals_set_b } from '@menus/layout-ui'
import { save_default_userAddress_b, select_userAddress_evt_T } from '@menus/user-address-ui'
import { timeout_ms } from '@menus/web-config'
import type { UserAddress } from '@menus/user-address-common'
import type { settings_ui_Ctx } from '../settings_ui_Ctx.js'
export const UserAddressList_Settings = 'UserAddressList_Settings'
export const UserPaymentList_Settings = 'UserPaymentList_Settings'
export const SoldOutActions_Settings = 'SoldOutActions_Settings'
export const Account_Settings = 'Account_Settings'
const Controller_name = 'Settings_c'
export class Settings_c extends BaseController<settings_ui_Ctx> {
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly form$:Writable$<HTMLFormElement> = writable$(null)
	readonly goto_login = goto_login_b(this.ctx)
	readonly consumer_login_user$:consumer_login_user$_T = consumer_login_user$_b(this.ctx)
	readonly isLoggedOut$ = this.consumer_login_user$.isLoggedOut$
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly open_modals_set = open_modals_set_b(this.ctx)
	readonly save_default_userAddress = save_default_userAddress_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly page_query$ = page_query$_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly change_password_busy$:Writable$<boolean> = writable$(false)
	readonly SoldOutAction_busy$:Writable$<boolean> = writable$(false)
	readonly selected_SoldOutAction$:Writable$<any> = writable$({})
	readonly show_new_confirm_password$:Writable$<boolean> = writable$(false)
	readonly show_current_password$:Writable$<boolean> = writable$(false)
	readonly show_new_password$:Writable$<boolean> = writable$(false)
	readonly SoldOutActions$:Writable$<SoldOutAction[]> = writable$([])
	readonly userAddress_a$:Writable$<UserAddress[]|undefined> = writable$([])
	readonly change_password$:Writable$<ChangePassword> = writable$(new ChangePassword())
	readonly onInit = async ()=>{
		this.load_data().then()
	}
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.unsubscribers.push(
			this.isLoggedOut$.subscribe(isLoggedOut=>{
				if (isLoggedOut) {
					this.goto_login()
				}
			})
		)
	}
	async onDestroy() {
		this.open_modals_set.delete(UserAddressList_Settings)
		this.open_modals_set.delete(UserPaymentList_Settings)
		this.open_modals_set.delete(SoldOutActions_Settings)
		this.open_modals_set.delete(Account_Settings)
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		log(this.ctx, Controller_name, 'load_data')
		this.busy$.$ = true
		try {
			const requestData = new UserAPIRequestQuery()
			const [
				get_userAddresses_payload,
				get_app_settings_payload,
			] = await Promise.all([
				this.consumer_http_client.get_userAddresses(requestData),
				this.consumer_http_client.get_app_settings(requestData),
			]) as [
				get_userAddresses_payload_T,
				get_app_settings_payload_T,
			]
			this.userAddress_a$.$ = get_userAddresses_payload
			const SoldOutActions = get_app_settings_payload.SoldOutActions
			this.SoldOutActions$.$ = SoldOutActions
			const consumer_login_user = await subscribe_wait_timeout(
				this.consumer_login_user$, neql_(undefined), timeout_ms
			) as User
			const SoldOutAction = consumer_login_user?.SoldOutAction
			this.selected_SoldOutAction$.$ =
				SoldOutAction
				? SoldOutActions.find(s=>s.ID === SoldOutAction.ID)
				: SoldOutActions.find(s=>s.IsDefault)
			log(this.ctx, Controller_name, 'payloads')
		} finally {
			this.busy$.$ = false
		}
	}
	readonly onclick_SoldOutAction = async (SoldOutAction:SoldOutAction)=>{
		log(this.ctx, Controller_name, 'onclick_SoldOutAction()')
		this.selected_SoldOutAction$.$ = SoldOutAction
		this.SoldOutAction_busy$.$ = true
		try {
			const requestData = new SoldOutActionAPIRequestQuery()
			requestData.a = this.selected_SoldOutAction$.$.ID
			const payload = await this.consumer_http_client.update_SoldOutAction(requestData)
			if (payload.Code === 'CUSTOMER_SETTINGS_UPDATED') {
				const consumer_login_user = await subscribe_wait_timeout(
					this.consumer_login_user$, I, timeout_ms
				) as User
				consumer_login_user.SoldOutAction = this.selected_SoldOutAction$.$
				this.consumer_login_user$.refresh()
				this.notyf_success('Successfully updated Sold Out Action.')
			}
			log(this.ctx, 'onclick_SoldOutAction()', payload)
		} finally {
			this.SoldOutAction_busy$.$ = false
		}
	}
	readonly toggle_show_current_password = ()=>{
		this.show_current_password$.update(not)
	}
	readonly toggle_show_new_password = ()=>{
		this.show_new_password$.update(not)
	}
	readonly toggle_show_new_confirm_password = ()=>{
		this.show_new_confirm_password$.update(not)
	}
	readonly save_change_password = async ()=>{
		log(this.ctx, Controller_name, 'save_change_password')
		this.change_password_busy$.$ = true
		try {
			const requestData = new ChangePasswordAPIRequestQuery()
			ChangePasswordAPIRequestQuery.fill_userPassword(requestData, this.change_password$.$)
			ChangePasswordAPIRequestQuery.fill_login_user(requestData, this.consumer_login_user$.$)
			const payload = await this.consumer_http_client.change_password(requestData)
			if (payload?.Code === 'PASSWORD_UPDATED') {
				this.notyf_success('Password updated successfully.')
			} else {
				this.notyf_error('Unable to update password.')
			}
			this.form$.$?.resetForm()
			this.change_password$.$ = new ChangePassword()
			log(this.ctx, 'payload', payload)
		} finally {
			this.change_password_busy$.$ = false
		}
	}
	readonly on_select_userAddress = async (evt:select_userAddress_evt_T)=>{
		const { userAddress } = evt.detail
		await this.save_default_userAddress(userAddress)
	}
	readonly onclick_goback = async ()=>{
		const page_query:Query = this.page_query$.$
		const returnUrl = page_query.returnUrl || '/'
		await this.navigating_goto(returnUrl)
	}
}
