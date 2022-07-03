import { query_str_ } from '@ctx-core/uri'
import { writable$, Writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { log } from '@menus/util'
import { STATUS_SUCCESS } from '@menus/web-config'
import { Path } from '@menus/route'
import { ro_httpClient_b, RoRequestQuery } from '@menus/ro-http'
import { navigating_goto_b } from '@menus/page'
import { notyf_error_b } from '@menus/notyf'
import type { ro_forgot_password_ui_Ctx } from '../ro_forgot_password_ui_Ctx.js'
const Controller_name = 'ForgotPassword_c'
export class ForgotPassword_c extends BaseController<ro_forgot_password_ui_Ctx> {
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly email$:Writable$<string> = writable$(null)
	readonly form_send_code_errors$:Writable$<string[]> = writable$([])
	readonly onInit = async ()=>{
		this.unsubscribers.push(
			this.email$.subscribe(()=>this.form_send_code_errors$.$ = [])
		)
	}
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly send_code = async ()=>{
		log(this.ctx, Controller_name, 'send_code()', this.email$)
		this.busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			const email = this.email$.$
			requestData.e = email
			const payload = await this.ro_httpClient.API_RESET_forgot(requestData)
			if (payload.Status === STATUS_SUCCESS) {
				await this.navigating_goto([
					Path.RO.BASE,
					Path.RO.RESET_PASSWORD,
					query_str_({ email: email })
				])
			} else {
				await this.notyf_error('Invalid Email Address')
				this.form_send_code_errors$.$ = [payload.Message]
			}
			log(this.ctx, Controller_name, 'payload', payload)
		} finally {
			this.busy$.$ = false
		}
	}
}
