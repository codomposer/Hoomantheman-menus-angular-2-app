import { tup } from '@ctx-core/array'
import { I } from '@ctx-core/combinators'
import { derived$, Readable$, writable$, Writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { APIRequestQuery } from '@menus/api'
import { log } from '@menus/util'
import { page_query$_b } from '@ctx-core/sapper'
import { consumer_http_client_b, consumer_http_client_T } from '@menus/consumer-http'
import { RegisterAPIRequestQuery, User } from '@menus/consumer-user-common'
import { navigating_goto_b, navigating_goto_T } from '@menus/page'
import { refresh_writable_ } from '@menus/store'
import { signup_email$_b } from '../signup_email$_b.js'
import { signup_phone$_b } from '../signup_phone$_b.js'
import type { consumer_auth_ui_Ctx } from '../consumer_auth_ui_Ctx.js'
const forgot_password_msg_suffix = 'The <a href="/forgot-password">Forgot Password</a> form will help you retrieve your password.'
const Controller_name = 'Signup_c'
export class Signup_c extends BaseController<consumer_auth_ui_Ctx> {
	readonly consumer_http_client:consumer_http_client_T = consumer_http_client_b(this.ctx)
	readonly navigating_goto:navigating_goto_T = navigating_goto_b(this.ctx)
	readonly page_query$ = page_query$_b(this.ctx)
	readonly signup_email$ = signup_email$_b(this.ctx)
	readonly signup_phone$ = signup_phone$_b(this.ctx)
	readonly agree_to_privacy_policy$ = writable$(false)
	readonly agree_to_terms_of_use$ = writable$(false)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly save_busy$:Writable$<boolean> = writable$(false)
	readonly ConfirmEmail$:Writable$<string> = writable$(null)
	readonly ConfirmPassword$:Writable$<string> = writable$(null)
	readonly Email$:Writable$<string> = writable$(null)
	readonly FirstName$:Writable$<string> = writable$(null)
	readonly LastName$:Writable$<string> = writable$(null)
	readonly Password$:Writable$<string> = writable$(null)
	readonly Phone$:Writable$<string> = writable$(null)
	readonly register_error_email$:Writable$<string> = writable$(null)
	readonly register_error_phone$:Writable$<string> = writable$(null)
	readonly SecurityAnswer$:Writable$<string> = writable$(null)
	readonly SecurityQuestion$:Writable$<string> = writable$(null)
	readonly SecurityQuestionID$:Writable$<number> = writable$(null)
	readonly step$:Writable$<number> = writable$(1)
	readonly user$:Writable$<User> = refresh_writable_(new User())
	readonly register_email_errors$:Readable$<string[]> = derived$(tup(this.Email$, this.register_error_email$),//region
		([Email, register_error_email])=>{
			return (
				Email && Email === register_error_email
				? [`Email already exists. ${forgot_password_msg_suffix}`]
				: []
			)
		}
	)//endregion
	readonly register_phone_errors$:Readable$<string[]> = derived$(tup(this.Phone$, this.register_error_phone$),//region
		([Phone, register_error_phone])=>{
			return (
				Phone && Phone === register_error_phone
				? [`Phone number already exists. ${forgot_password_msg_suffix}`]
				: []
			)
		}
	)//endregion
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
			const requestData = new APIRequestQuery()
			const payload = await this.consumer_http_client.get_security_question(requestData)
			const payload_0 = payload?.[0]
			if (payload_0) {
				this.SecurityQuestion$.$ = payload_0.Question
				this.SecurityQuestionID$.$ = payload_0.ID
				this.user$.update(I)
			}
			log(this.ctx, Controller_name, 'get_security_question()', payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly submit_form_1 = ()=>{
		this.step$.$ = 2
	}
	readonly submit_form_2 = ()=>{
		this.step$.$ = 3
	}
	readonly submit_form_3 = ()=>{
		this.step$.$ = 4
	}
	readonly submit_form_4 = async ()=>{
		await this.register()
	}
	readonly register = async ()=>{
		log(this.ctx, Controller_name, 'register')
		this.save_busy$.$ = true
		try {
			const request = new RegisterAPIRequestQuery()
			const Email = this.Email$.$
			const Phone = this.Phone$.$
			RegisterAPIRequestQuery.fill_user(request, {
				FirstName: this.FirstName$.$,
				LastName: this.LastName$.$,
				UserName: Email,
				Email,
				ConfirmEmail: this.ConfirmEmail$.$,
				Phone,
				Password: this.Password$.$,
				ConfirmPassword: this.ConfirmPassword$.$,
				SecurityQuestionID: this.SecurityQuestionID$.$,
				SecurityAnswer: this.SecurityAnswer$.$,
			})
			const payload = await this.consumer_http_client.register(request)
			const { Code } = payload
			if (Code) {
				if (Code === 'ERROR_PHONE_EXISTS') {
					this.register_error_phone$.$ = Phone
					this.step$.$ = 1
				} else if (Code === 'ERROR_EMAIL_EXISTS') {
					this.register_error_email$.$ = Email
					this.step$.$ = 2
				} else if (Code === 'CUSTOMER_ADDED') {
					this.signup_email$.$ = Email
					this.signup_phone$.$ = Phone
					await this.navigating_goto('/verify')
				}
			}
		} finally {
			this.save_busy$.$ = false
		}
	}

	readonly onclick_goback = async ()=>{
		const page_query = this.page_query$.$
		const returnUrl = page_query.returnUrl || '/'
		await this.navigating_goto(returnUrl)
	}
}
