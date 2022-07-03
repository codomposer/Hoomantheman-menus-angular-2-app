import { writable$, Writable$ } from '@ctx-core/store'
import { log } from '@menus/util'
import { consumer_http_client_b, verify_payload_T, verify_requestData_T } from '@menus/consumer-http'
import { BaseController } from '@menus/shared-ui-lib'
import { RegisterAPIRequestQuery } from '@menus/consumer-user-common'
import { signup_email$_b } from '../signup_email$_b.js'
import { send_forgot_password_b } from '../ForgotPassword'
import { signup_phone$_b } from '../signup_phone$_b.js'
import type { consumer_auth_ui_Ctx } from '../consumer_auth_ui_Ctx.js'
import { query_email$_b } from '@menus/page'
export const SUCCESS_TITLE = 'Success!'
export const SUCCESS_SUBTITLE = 'Your email is successfully verified.'
export const ERROR_TITLE = 'Error!'
export const ERROR_SUBTITLE = 'The link you opened is either invalid or expired.'
const Controller_name = 'VerifySignup_c'
export class VerifySignup_c extends BaseController<consumer_auth_ui_Ctx> {
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly query_email$ = query_email$_b(this.ctx)
	readonly send_forgot_password = send_forgot_password_b(this.ctx)
	readonly signup_email$ = signup_email$_b(this.ctx)
	readonly signup_phone$ = signup_phone$_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly in_code$:Writable$<string> = writable$('')
	readonly subtitle$:Writable$<string> = writable$('')
	readonly title$:Writable$<string> = writable$('')
	readonly verify_success$:Writable$<boolean> = writable$(false)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		await this.verify_signup()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly resend_code = async ()=>{
		this.busy$.$ = true
		try {
			await this.send_verification_code()
		} finally {
			this.busy$.$ = false
		}
	}
	readonly send_verification_code = async ()=>{
		const request = new RegisterAPIRequestQuery()
		const signup_email = this.signup_email$.$
		const signup_phone = this.signup_phone$.$
		const query_email = this.query_email$.$
		if (signup_email || query_email) request.e = signup_email || query_email
		if (signup_phone) request.p = signup_phone
		const payload = await this.consumer_http_client.send_verification_code(request)
		return payload
	}
	readonly verify_signup = async ()=>{
		const in_code = this.in_code$.$
		if (!in_code) return
		this.busy$.$ = true
		try {
			const requestData:verify_requestData_T = {
				c: in_code,
			}
			const payload:verify_payload_T =
				/^[0-9]{4,}$/.test(in_code)
				? await this.consumer_http_client.verify_phone(requestData)
				: await this.consumer_http_client.verify_email(requestData)
			if (~['EMAIL_VALIDATED', 'PHONE_VALIDATED'].indexOf(payload.Code)) {
				this.title$.$ = SUCCESS_TITLE
				this.subtitle$.$ = SUCCESS_SUBTITLE
				this.verify_success$.$ = true
				this.signup_email$.$ = ''
			} else {
				this.title$.$ = ERROR_TITLE
				this.subtitle$.$ = ERROR_SUBTITLE
				this.verify_success$.$ = false
			}
			log(this.ctx, Controller_name, 'verify_signup', payload)
		} finally {
			this.busy$.$ = false
		}
	}
}
