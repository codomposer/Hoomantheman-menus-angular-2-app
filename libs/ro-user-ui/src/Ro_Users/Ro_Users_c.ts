import { I } from '@ctx-core/combinators'
import { has_dom } from '@ctx-core/dom'
import { noinit_subscribe, subscribe_wait_timeout, Writable$, writable$ } from '@ctx-core/store'
import { BaseController, confirmModal$_b } from '@menus/shared-ui'
import { log } from '@menus/util'
import { Path } from '@menus/route'
import {
	API_USER_del_b, API_USER_list_b, API_USER_resendemail_b, API_USER_resendemail_payload_T, API_USER_save_b,
	ro_httpClient_b, RoRequestQuery
} from '@menus/ro-http'
import { STATUS_SUCCESS, timeout_ms } from '@menus/web-config'
import { is_admin_role$_b, ro_login_user$_b, ro_login_user$_T, Ro_User } from '@menus/ro-user-common'
import { navigating_goto_b, params_fireFlyID$_b } from '@menus/page'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import type { Edit_Ro_User_Modal_update_evt_T, Edit_Ro_User_Modal_I } from '../Edit_Ro_User_Modal'
import type { ro_user_ui_Ctx } from '../ro_user_ui_Ctx.js'
export const PAGINATION_ID = 'USERS_PAGINATION_ID'
const Controller_name = 'Ro_Users_c'
export class Ro_Users_c extends BaseController<ro_user_ui_Ctx> {
	readonly API_USER_del = API_USER_del_b(this.ctx)
	readonly API_USER_list = API_USER_list_b(this.ctx)
	readonly API_USER_resendemail = API_USER_resendemail_b(this.ctx)
	readonly API_USER_save = API_USER_save_b(this.ctx)
	readonly confirmModal$ = confirmModal$_b(this.ctx)
	readonly Edit_Ro_User_Modal_instance$:Writable$<Edit_Ro_User_Modal_I> = writable$(null)
	readonly is_admin_role$ = is_admin_role$_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly ro_login_user$:ro_login_user$_T = ro_login_user$_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly userLevel$:Writable$<number> = writable$(-1)
	readonly resend_code_status_r$:refresh_writable_T<resend_code_status_r_T> = refresh_writable_({})
	readonly ro_users$ = refresh_writable_<Ro_User[]>([])
	readonly keywords$:Writable$<string> = writable$('')
	readonly page$:Writable$<number> = writable$(1)
	readonly pageSize$:Writable$<number> = writable$(25)
	readonly TotalPages$:Writable$<number> = writable$(0)
	readonly TotalRow$:Writable$<number> = writable$(0)
	readonly onInit = async ()=>{
		log(this.ctx, Controller_name, 'Init()')
		if (has_dom) {
			await subscribe_wait_timeout(this.ro_login_user$.ready$, I, timeout_ms)
			if (!this.is_admin_role$.$) {
				await this.navigating_goto(`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}`)
			}
		}
	}
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.unsubscribers.push(
			noinit_subscribe(this.page$, this.load_data),
			noinit_subscribe(this.pageSize$, () => {
				this.page$.$ = 1
				this.load_data()
			}),
			noinit_subscribe(this.keywords$, this.load_data),
			noinit_subscribe(this.userLevel$, this.load_data),
		)
		this.load_data().then()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		log(this.ctx, Controller_name, 'load_data()')
		this.busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			RoRequestQuery.fill_search(requestData, this.keywords$.$)
			RoRequestQuery.fill_page(requestData, this.page$.$)
			RoRequestQuery.fill_pageSize(requestData, this.pageSize$.$)
			const userLevel = this.userLevel$.$
			if (userLevel > -1)
				RoRequestQuery.fill_userLevel(requestData, userLevel)
			const payload = await this.API_USER_list(requestData)
			this.ro_users$.$ = payload.Data
			this.TotalPages$.$ = payload.Pagination.TotalPages
			this.TotalRow$.$ = payload.Pagination.TotalRow
			log(this.ctx, Controller_name, 'API_RESTAURANT_list', payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly search_text_Enter = async ()=>{
		this.page$.$ = 1
		await this.load_data()
	}
	readonly open_Edit_Ro_User_Modal_instance = async (ro_user?:Ro_User)=>{
		await this.Edit_Ro_User_Modal_instance$.$.open({
			ro_user,
		})
		await this.load_data()
	}
	readonly select_ro_user = async (ro_user?:Ro_User)=>{
		if (!ro_user.EmailVerified) {
			this.notyf_error(`You can't edit the user until his Email is verified`)
		} else {
			await this.open_Edit_Ro_User_Modal_instance(ro_user)
		}
	}
	readonly oncreate = (evt:Edit_Ro_User_Modal_update_evt_T)=>{
		const ro_user = evt.detail
		const ro_users = this.ro_users$.$
		ro_users.push(ro_user)
		this.ro_users$.$ = ro_users
	}
	readonly onupdate = ()=>{
		this.ro_users$.refresh()
	}
	readonly save_ro_user = async (ro_user:Ro_User)=>{
		log(this.ctx, Controller_name, 'save_ro_user', ro_user)
		this.busy$.$ = true
		try {
			const payload = await this.API_USER_save({ user: ro_user })
			if (payload.Status === STATUS_SUCCESS) {
				this.notyf_success('User saved successfully.')
			} else {
				this.notyf_error('Unable to update item, Please try later.')
			}
			log(this.ctx, Controller_name, 'API_USER_save', payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly delete_ro_user = async (userIndex, ro_user:Ro_User)=>{
		const confirm = await this.confirmModal$.$.open({
			message: `Are you sure you want to delete ${ro_user.Email}?`,
		})
		if (confirm) {
			log(this.ctx, Controller_name, 'delete_ro_user()')
			this.busy$.$ = true
			try {
				const requestData = new RoRequestQuery()
				RoRequestQuery.fill_ID(requestData, ro_user.id)
				const payload = await this.API_USER_del(requestData)
				if (payload.Status === STATUS_SUCCESS) {
					const ro_users = this.ro_users$.$
					ro_users.splice(userIndex, 1)
					this.ro_users$.$ = ro_users
				} else {
					this.notyf_error('Unable to delete item, Please try later.')
					console.error(payload)
				}
				log(this.ctx, Controller_name, 'delete_ro_user', payload)
			} finally {
				this.busy$.$ = false
			}
		}
	}
	readonly resend_code = async (ro_user:Ro_User)=>{
		this.resend_code_status_r$.refresh({ [ro_user.id]: 'sending' })
		const requestData = new RoRequestQuery()
		requestData.ff = this.params_fireFlyID$.$
		requestData.e = ro_user.Email
		let API_USER_resendemail_payload:API_USER_resendemail_payload_T
		try {
			API_USER_resendemail_payload = await this.API_USER_resendemail(requestData)
		} catch (e) {
			this.resend_code_status_r$.refresh({ [ro_user.id]: 'error' })
			throw e
		}
		if (API_USER_resendemail_payload.Status === 'error') {
			this.resend_code_status_r$.refresh({ [ro_user.id]: 'error' })
			await this.notyf_error(API_USER_resendemail_payload.Message)
		} else {
			this.resend_code_status_r$.refresh({ [ro_user.id]: 'sent' })
		}
	}
}
export type resend_code_status_T = void|'sending'|'sent'|'error'
export interface resend_code_status_r_T extends Record<number, resend_code_status_T> {
}
