import { Writable$, writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { log } from '@menus/util'
import { STATUS_SUCCESS } from '@menus/web-config'
import { ro_httpClient_b } from '@menus/ro-http'
import type { ro_verify_ui_Ctx } from '../ro_verify_ui_Ctx.js'
export const PAGE_TYPE_RO = 'PAGE_TYPE_RO'
export const PAGE_TYPE_CR = 'PAGE_TYPE_CR'
export const SUCCESS_TITLE = 'Success!'
export const SUCCESS_SUBTITLE = 'Your email is successfully verified.'
export const ERROR_TITLE = 'Error!'
export const ERROR_SUBTITLE = 'The link you opened is either invalid or expired.'
const Controller_name = 'VerifySignup_c'
export class VerifySignup_c extends BaseController<ro_verify_ui_Ctx> {
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly in_code$:Writable$<string> = writable$('')
	readonly subtitle$:Writable$<string> = writable$('')
	readonly title$:Writable$<string> = writable$('')
	readonly verify_success$:Writable$<boolean> = writable$(false)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.verify_signup().then()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly verify_signup = async ()=>{
		const in_code = this.in_code$.$
		if (!in_code) return
		this.busy$.$ = true
		try {
			const requestData = {
				c: in_code,
			}
			const payload = await this.ro_httpClient.API_RESET_verify_email(requestData)
			if (payload.Status === STATUS_SUCCESS) {
				this.title$.$ = SUCCESS_TITLE
				this.subtitle$.$ = SUCCESS_SUBTITLE
				this.verify_success$.$ = true
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
