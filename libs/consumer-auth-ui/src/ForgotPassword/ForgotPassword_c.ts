import { writable$, Writable$ } from '@ctx-core/store'
import { log } from '@menus/util'
import { notyf_error_b, notyf_error_T } from '@menus/notyf'
import { consumer_http_client_b, consumer_http_client_T } from '@menus/consumer-http'
import { BaseController } from '@menus/shared-ui-lib'
import { navigating_goto_b, navigating_goto_T } from '@menus/page'
import type { consumer_auth_ui_Ctx } from '../consumer_auth_ui_Ctx.js'
import { send_forgot_password_b } from './send_forgot_password_b.js'
import { forgot_password_email_phone$_b, forgot_password_email_phone$_T } from './forgot_password_email_phone$_b.js'
const Controller_name = 'ForgotPassword_c.js'
export class ForgotPassword_c extends BaseController<consumer_auth_ui_Ctx> {
	readonly consumer_http_client:consumer_http_client_T = consumer_http_client_b(this.ctx)
	readonly forgot_password_email_phone$:forgot_password_email_phone$_T = forgot_password_email_phone$_b(this.ctx)
	readonly navigating_goto:navigating_goto_T = navigating_goto_b(this.ctx)
	readonly notyf_error:notyf_error_T = notyf_error_b(this.ctx)
	readonly in_send_forgot_password = send_forgot_password_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly send_forgot_password = async ()=>{
		log(this.ctx, Controller_name, 'send_forgot_password')
		this.busy$.$ = true
		try {
			const payload = await this.in_send_forgot_password(this.forgot_password_email_phone$.$)
			if (payload?.Code === 'SUCCESS_SEND_PASSWORD_RESET') {
				await this.navigating_goto('/reset-password')
			} else {
				this.notyf_error('Invalid Email/Phone')
			}
		} finally {
			this.busy$.$ = false
		}
	}
}
