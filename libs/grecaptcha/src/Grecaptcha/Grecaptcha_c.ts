import { I } from '@ctx-core/combinators'
import { subscribe_wait_timeout, Writable$, writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { RECAPTCHA_SITE_KEY_, timeout_ms } from '@menus/web-config'
import type { grecaptcha_Ctx } from '../grecaptcha_Ctx.js'
import { grecaptcha_loaded$_b } from '../grecaptcha_loaded$_b.js'
const Controller_name = 'Grecaptcha_c'
export class Grecaptcha_c extends BaseController<grecaptcha_Ctx> {
	widgetID:number
	readonly grecaptcha_loaded$ = grecaptcha_loaded$_b(this.ctx)
	readonly RECAPTCHA_SITE_KEY = RECAPTCHA_SITE_KEY_(this.ctx.webConfig)
	readonly elem$:Writable$<HTMLDivElement> = writable$(null)
	readonly theme$:Writable$<ReCaptchaV2.Theme> = writable$(null)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		await subscribe_wait_timeout(this.grecaptcha_loaded$, I, timeout_ms)
		await subscribe_wait_timeout(this.elem$, I, timeout_ms)
		await subscribe_wait_timeout(this.theme$, I, timeout_ms)
		this.widgetID = grecaptcha.render(this.elem$.$, {
			sitekey: this.RECAPTCHA_SITE_KEY,
			callback: ()=>{
				const captcha_code = grecaptcha.getResponse(this.widgetID)
				this.dispatch('verification', captcha_code)
			},
			'expired-callback': ()=>{
				this.dispatch('verification', null)
			},
			theme: this.theme$.$,
		})
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
}
