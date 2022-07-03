import { I } from '@ctx-core/combinators'
import { has_dom } from '@ctx-core/dom'
import { page_query$_b, page_query$_T } from '@ctx-core/sapper'
import { subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { enable_beta_features$_b } from '@menus/layout-ui'
import { notyf_error_b } from '@menus/notyf'
import { navigating_goto_b } from '@menus/page'
import {
	API_USER_auth_login_b, API_USER_login_b, API_USER_login_payload_T, ro_httpClient_b, RoLoginAPIRequestQuery,
	RoRequestQuery,
} from '@menus/ro-http'
import { ro_isLoggedIn$_b, ro_login_user$_b, Ro_User } from '@menus/ro-user-common'
import { Path } from '@menus/route'
import { BaseController } from '@menus/shared-ui-lib'
import type { isLoggedIn$_T } from '@menus/user-common'
import { log } from '@menus/util'
import { IS_ENV_LIVE_, ENV_DEV, ENV_LIVE, STATUS_SUCCESS, timeout_ms, } from '@menus/web-config'
import type { ro_login_ui_Ctx } from '../ro_login_ui_Ctx.js'
const Controller_name = 'Login_c'
export class Login_c extends BaseController<ro_login_ui_Ctx> {
	readonly API_USER_login = API_USER_login_b(this.ctx)
	readonly API_USER_auth_login = API_USER_auth_login_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly page_query$:page_query$_T = page_query$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly ro_isLoggedIn$:isLoggedIn$_T = ro_isLoggedIn$_b(this.ctx)
	readonly ro_login_user$ = ro_login_user$_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly email$:Writable$<string> = writable$(null)
	readonly enable_beta_features$ = enable_beta_features$_b(this.ctx)
	readonly envToggleLive$:Writable$<boolean> = writable$(IS_ENV_LIVE_(this.ctx.webConfig))
	readonly password$:Writable$<string> = writable$(null)
	readonly show_password$:Writable$<boolean> = writable$(false)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		if (has_dom) {
			const page_query = this.page_query$.$
			log(this.ctx, Controller_name, { page_query })
			if (page_query?.session === 'expired') {
				await this.notyf_error('Session expired!')
			}
			if (this.ro_isLoggedIn$.$ || (page_query?.email && page_query.authcode)) {
				const ro_login_user = await subscribe_wait_timeout(
					this.ro_login_user$, I, timeout_ms
				) as Ro_User
				await this.authcode_login(ro_login_user.Email, ro_login_user.AuthCode)
			}
		}
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly envToggleChange = ()=>{
		log(this.ctx, Controller_name, 'envToggleChange()', this.envToggleLive$.$)
		localStorage.setItem('app_env', this.envToggleLive$.$ ? ENV_LIVE : ENV_DEV)
		window.location.reload()
	}
	readonly toggle_show_password = ()=>{
		this.show_password$.$ = !this.show_password$.$
	}
	readonly login = async ()=>{
		log(this.ctx, Controller_name, 'login()')
		this.busy$.$ = true
		try {
			const request = new RoLoginAPIRequestQuery()
			RoLoginAPIRequestQuery.fill_user(request, {
				Email: this.email$.$,
				Password: this.password$.$,
			})
			const payload = await this.API_USER_login(request)
			await this.onlogincomplete(payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly authcode_login = async (email$:string, authcode:string)=>{
		log(this.ctx, Controller_name, 'authcode_login()')
		this.busy$.$ = true
		try {
			const request = new RoRequestQuery()
			request.e = email$
			request.authcode = authcode
			const payload = await this.API_USER_auth_login(request)
			await this.onlogincomplete(payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly onlogincomplete = async (payload:API_USER_login_payload_T)=>{
		if (payload.Status === STATUS_SUCCESS) {
			this.ro_login_user$.$ = payload.Data
			const page_query = this.page_query$.$
			const returnUrl = page_query?.returnUrl as string
			const url =
				this.ro_login_user$.$?.Terms
				? returnUrl
					? returnUrl
					: `/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}`
				: `/${Path.RO.BASE}/${Path.RO.TERMS_CONDITIONS}`
			await this.navigating_goto(url)
		} else {
			this.ro_login_user$.$ = null
			if (payload.Code === 'ERR_EMAIL_UNVERIFIED') {
				await this.notyf_error('Email is not verified, Please verify it and try again.')
			} else {
				await this.notyf_error('Invalid Username/password')
			}
		}
		log(this.ctx, Controller_name, 'payload', payload)
	}
	readonly signup = async ()=>{
		await this.navigating_goto(`/${Path.RO.BASE}/${Path.RO.SIGNUP}`)
	}
	readonly onclick_goback = async ()=>{
		const page_query = this.page_query$.$
		const returnUrl = page_query.returnUrl || '/backoffice'
		await this.navigating_goto(returnUrl)
	}
}
