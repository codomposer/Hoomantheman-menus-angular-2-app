import { I } from '@ctx-core/combinators'
import { has_dom } from '@ctx-core/dom'
import { page_query$_b, page_query$_T, Query } from '@ctx-core/sapper'
import { subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { consumer_http_client_b, login_payload_T } from '@menus/consumer-http'
import { LoginAPIRequestQuery, consumer_login_user$_b, User } from '@menus/consumer-user-common'
import { notyf_error_b } from '@menus/notyf'
import { navigating_goto_b } from '@menus/page'
import { BaseController } from '@menus/shared-ui-lib'
import { auth, social_login_data$_b } from '@menus/social-login'
import { log } from '@menus/util'
import { timeout_ms } from '@menus/web-config'
import type { consumer_auth_ui_Ctx } from '../consumer_auth_ui_Ctx.js'
export const STEP_LOGIN = 'STEP_LOGIN'
export const STEP_EMAIL = 'STEP_EMAIL'
export const PROVIDER_FACEBOOK = 'facebook'
export const PROVIDER_GOOGLE = 'google'
const Controller_name = 'Login_c'
export class Login_c extends BaseController<consumer_auth_ui_Ctx> {
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly consumer_login_user$ = consumer_login_user$_b(this.ctx)
	readonly isLoggedIn$ = this.consumer_login_user$.isLoggedIn$
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly page_query$:page_query$_T = page_query$_b(this.ctx)
	readonly social_login_data$ = social_login_data$_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly email$:Writable$<string> = writable$(null)
	readonly password$:Writable$<string> = writable$(null)
	readonly social_login_email$:Writable$<string> = writable$(null)
	readonly returnUrl$:Writable$<string> = writable$(null)
	readonly step$:Writable$<string> = writable$(STEP_LOGIN)
	last_request:LoginAPIRequestQuery
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		if (has_dom) {
			const page_query:Query = this.page_query$.$
			log(this.ctx, Controller_name, { page_query })
			if (page_query?.session === 'expired') {
				await this.notyf_error('Session expired!')
			}
			if (this.isLoggedIn$.$ || (page_query.email$ && page_query.authcode)) {
				const consumer_login_user = await subscribe_wait_timeout(
					this.consumer_login_user$, I, timeout_ms
				) as User
				await this.authcode_login(consumer_login_user.Email, consumer_login_user.AuthCode)
			}
		}
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly login = async (request?:LoginAPIRequestQuery)=>{
		log(this.ctx, Controller_name, 'login')
		this.busy$.$ = true
		try {
			if (!request) {
				request = new LoginAPIRequestQuery()
				LoginAPIRequestQuery.fill_user(request, {
					Email: this.email$.$,
					Password: this.password$.$,
				})
			}
			request.act = LoginAPIRequestQuery.ACTION_LOGIN
			const payload = await this.consumer_http_client.login(request)
			await this.onlogincomplete(request, payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly email_social_login = async ()=>{
		this.last_request.e = this.social_login_email$.$
		await this.login(this.last_request)
	}
	readonly social_login = async (provider:string)=>{
		const social_login_data = await auth.login(provider)
		if (social_login_data?.provider) {
			const request = new LoginAPIRequestQuery()
			request.access_token = social_login_data.token
			if (social_login_data.provider === 'facebook') {
				request.sn_id = LoginAPIRequestQuery.LOGIN_FACEBOOK_ACCOUNT
			} else if (social_login_data.provider === 'google') {
				request.sn_id = LoginAPIRequestQuery.LOGIN_GOOGLE_ACCOUNT
			}
			this.social_login_data$.$ = social_login_data
			await this.login(request)
		}
	}
	readonly authcode_login = async (email:string, authcode:string)=>{
		log(this.ctx, Controller_name, 'authcode_login()')
		this.busy$.$ = true
		try {
			const request = new LoginAPIRequestQuery()
			request.e = email
			request.authcode = authcode
			const payload = await this.consumer_http_client.login(request)
			if (payload) {
				await this.onlogincomplete(request, payload)
			}
		} finally {
			this.busy$.$ = false
		}
	}
	readonly onlogincomplete = async (request:LoginAPIRequestQuery, payload:login_payload_T)=>{
		const { Code } = payload
		if (Code === 'MISSING_EMAIL_ADDRESS') {
			this.step$.$ = STEP_EMAIL
			this.last_request = request
		} else if (Code === 'INVALID_USER') {
			await this.notyf_error('Invalid Username/password')
		} else if (Code === 'ERROR_ACCOUNT_NOT_VERIFIED') {
			await this.notyf_error(`Your account is not verified. Please <a href=/verify-email?email=${this.email$.$}>verify</a> it through email or phone.`)
		} else if (Code) {
			await this.notyf_error('Unable to login, Something went wrong.')
		} else {
			// in case of success
			const consumer_login_user = payload
			if (request.sn_id) {
				consumer_login_user.sn_id = request.sn_id
			}
			this.consumer_login_user$.$ = consumer_login_user
			// await subscribe_wait_timeout(this.userAddress, neql_(undefined), timeout_ms)
			const returnUrl = this.returnUrl$.$ || '/'
			await this.navigating_goto(returnUrl)
			log(this.ctx, Controller_name, 'user saved in session storage')
		}
		log(this.ctx, Controller_name, 'payload', payload)
	}
	readonly onclick_PlatformIcon = ()=>{
		if (this.consumer_login_user$.$) {
			this.consumer_login_user$.logout()
		}
	}
	readonly onclick_goback = async ()=>{
		const returnUrl = this.returnUrl$.$ || '/'
		await this.navigating_goto(returnUrl)
	}
}
