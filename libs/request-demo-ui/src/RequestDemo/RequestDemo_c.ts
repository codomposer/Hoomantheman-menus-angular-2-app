import { Writable$, writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { log } from '@menus/util'
import { ro_httpClient_b } from '@menus/ro-http'
import { STATUS_SUCCESS } from '@menus/web-config'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import type { request_demo_ui_Ctx } from '../request_demo_ui_Ctx.js'
const Controller_name = 'RequestDemo_c'
export class RequestDemo_c extends BaseController<request_demo_ui_Ctx> {
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly FirstName$:Writable$<string> = writable$(null)
	readonly LastName$:Writable$<string> = writable$(null)
	readonly RestName$:Writable$<string> = writable$(null)
	readonly Email$:Writable$<string> = writable$(null)
	readonly Phone$:Writable$<string> = writable$(null)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly submit_RequestDemo = async (event)=>{
		log(this.ctx, Controller_name, 'submit_RequestDemo()', event)
		this.busy$.$ = true
		try {
			const request = {
				f: this.FirstName$.$,
				l: this.LastName$.$,
				rn: this.RestName$.$,
				e: this.Email$.$,
				p: this.Phone$.$,
			}
			const payload = await this.ro_httpClient.API_REQUEST_DEMO(request)
			if (payload.Status === STATUS_SUCCESS) {
				this.notyf_success(`You request is submitted successfully. We will contact you as soon as possible.`)
			} else {
				this.notyf_error(`Unable to process your request at the moment, Please try again later.`)
			}
			this.FirstName$.$ = null
			this.LastName$.$ = null
			this.RestName$.$ = null
			this.Email$.$ = null
			this.Phone$.$ = null
			window.scrollTo(0, 0)
		} finally {
			this.busy$.$ = false
		}
	}
}
