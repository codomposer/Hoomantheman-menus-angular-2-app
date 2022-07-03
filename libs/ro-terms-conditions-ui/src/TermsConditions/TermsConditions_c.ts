import { subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { I } from '@ctx-core/combinators'
import { BaseController } from '@menus/shared-ui-lib'
import { Path } from '@menus/route'
import { log } from '@menus/util'
import { STATUS_SUCCESS, timeout_ms } from '@menus/web-config'
import { accept_terms$_b, ro_login_user$_b, Ro_User } from '@menus/ro-user-common'
import { notyf_error_b } from '@menus/notyf'
import { API_USER_update_terms_b, ro_httpClient_b } from '@menus/ro-http'
import { navigating_goto_b } from '@menus/page'
import type { login_user$_T } from '@menus/user-common'
import type { ro_terms_conditions_ui_Ctx } from '../ro_terms_conditions_ui_Ctx.js'
const Controller_name = 'TermsConditions_c'
export class TermsConditions_c extends BaseController<ro_terms_conditions_ui_Ctx> {
	readonly accept_terms$ = accept_terms$_b(this.ctx)
	readonly API_USER_update_terms = API_USER_update_terms_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly ro_login_user$:login_user$_T<Ro_User> = ro_login_user$_b(this.ctx)
	readonly agree_to_privacy_policy$ = writable$(false)
	readonly busy$:Writable$<boolean> = writable$(false)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		const ro_login_user = await subscribe_wait_timeout(
			this.ro_login_user$, I, timeout_ms
		) as Ro_User
		if (ro_login_user?.Terms) {
			await this.navigating_goto(`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}`)
		}
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly accept = async ()=>{
		log(this.ctx, Controller_name, 'accept()')
		this.busy$.$ = true
		try {
			const payload = await this.API_USER_update_terms()
			if (payload.Status === STATUS_SUCCESS) {
				await this.accept_terms$()
				await this.navigating_goto(`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}`)
			} else {
				this.notyf_error('Sorry, Unable to perform this operation. Please try later.')
			}
			log(this.ctx, Controller_name, 'acceptTC', payload)
		} finally {
			this.busy$.$ = false
		}
	}
}
