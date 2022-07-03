import { writable$, Writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { log } from '@menus/util'
import { STATUS_SUCCESS } from '@menus/web-config'
import { Path } from '@menus/route'
import { ro_httpClient_b, RoRequestQuery } from '@menus/ro-http'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { navigating_goto_b } from '@menus/page'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import type { ro_reset_password_ui_Ctx } from '../ro_reset_password_ui_Ctx.js'
const Controller_name = 'ResetPassword_c'
export class ResetPassword_c extends BaseController<ro_reset_password_ui_Ctx> {
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly code$:Writable$<string> = writable$(null)
	readonly email$:Writable$<string> = writable$(null)
	readonly new_password$:refresh_writable_T<string> = refresh_writable_('')
	readonly confirm_password$:refresh_writable_T<string> = refresh_writable_('')
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly reset_password = async ()=>{
		log(this.ctx, Controller_name, 'API_RESET_reset()', this.email$)
		this.busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			requestData.e = this.email$.$
			requestData.c = this.code$.$
			requestData.p = this.new_password$.$
			requestData.p2 = this.confirm_password$.$
			const payload = await this.ro_httpClient.API_RESET_reset(requestData)
			if (payload.Status === STATUS_SUCCESS) {
				this.email$.$ = null
				this.code$.$ = null
				this.new_password$.$ = null
				this.confirm_password$.$ = null
				this.notyf_success('Password reset successfully')
				await this.navigating_goto(`/${Path.RO.BASE}/${Path.RO.LOGIN}`)
			} else {
				this.notyf_error('You entered invalid information')
			}
			log(this.ctx, Controller_name, 'payload', payload)
		} finally {
			this.busy$.$ = false
		}
	}
}
