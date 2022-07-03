import { writable$, Writable$ } from '@ctx-core/store'
import { notyf_error_b } from '@menus/notyf'
import { log } from '@menus/util'
import { ResetPasswordAPIRequestQuery } from '@menus/consumer-user-common'
import { consumer_http_client_b } from '@menus/consumer-http'
import { BaseController } from '@menus/shared-ui-lib'
import { navigating_goto_b } from '@menus/page'
import { forgot_password_email_phone$_b, send_forgot_password_b } from '../ForgotPassword'
import type { consumer_auth_ui_Ctx } from '../consumer_auth_ui_Ctx.js'
const Controller_name = 'ResetPassword_c'
export class ResetPassword_c extends BaseController<consumer_auth_ui_Ctx> {
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly forgot_password_email_phone$ = forgot_password_email_phone$_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly in_send_forgot_password = send_forgot_password_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly confirm_password$:Writable$<string> = writable$(null)
	readonly new_password$:Writable$<string> = writable$(null)
	readonly resend_code_busy$:Writable$<boolean> = writable$(false)
	readonly reset_code$:Writable$<string> = writable$(null)
	readonly reset_code_success$:Writable$<boolean> = writable$(false)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly request_reset_password = async ()=>{
		this.busy$.$ = true
		try {
			const requestData = new ResetPasswordAPIRequestQuery()
			ResetPasswordAPIRequestQuery.fill_reset_password(requestData, {
				reset_code: this.reset_code$.$,
				new_password: this.new_password$.$,
				confirm_password: this.confirm_password$.$,
			})
			const payload = await this.consumer_http_client.reset_password(requestData)
			if (payload.Code === 'ERROR_NO_RECORD') {
				this.notyf_error(payload.Message)
			} else if (payload.Code === 'SUCCESS_PASSWORD_RESET') {
				this.reset_code_success$.$ = true
			} else {
				alert('Unable to reset password')
			}
			log(this.ctx, Controller_name, 'reset_password', payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly send_forgot_password = async ()=>{
		const forgot_password_email_phone = this.forgot_password_email_phone$.$
		if (forgot_password_email_phone) {
			this.resend_code_busy$.$ = true
			try {
				await this.in_send_forgot_password(forgot_password_email_phone)
			} finally {
				this.resend_code_busy$.$ = false
			}
		} else {
			await this.navigating_goto('/forgot-password')
		}
	}
}
