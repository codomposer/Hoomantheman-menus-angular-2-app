import { assign } from 'svelte/internal'
import { derived$, Readable$, writable$, Writable$ } from '@ctx-core/store'
import { BaseModalController } from '@menus/modal'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { ro_httpClient_b } from '@menus/ro-http'
import { PaymentMethod, PaymentMethod_I } from '@menus/ro-shared-models'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import { deep_clone, is_new_o_, log } from '@menus/util'
import { CARD_MONTHS, CARD_YEARS, STATUS_ERROR } from '@menus/web-config'
import type { ro_billing_ui_Ctx } from '../ro_billing_ui_Ctx.js'
import type {
	SavePaymentMethodModal_close_T, SavePaymentMethodModal_open_T, SavePaymentMethodModal_I
} from './SavePaymentMethodModal_I'
const Controller_name = 'SavePaymentMethodModalComponent.js'
export class SavePaymentMethodModal_c
	extends BaseModalController<SavePaymentMethodModal_open_T, SavePaymentMethodModal_close_T, ro_billing_ui_Ctx>
	implements SavePaymentMethodModal_I {
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly paymentMethod$:refresh_writable_T<PaymentMethod_I> = refresh_writable_<PaymentMethod_I>(null)
	readonly expiryMonth$:Writable$<number> = writable$(null)
	readonly expiryYear$:Writable$<string> = writable$(null)
	readonly isNewPaymentMethod$:Readable$<boolean> = derived$(this.paymentMethod$, is_new_o_)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly before_open_modal = async (data:SavePaymentMethodModal_open_T)=>{
		let paymentMethod:PaymentMethod_I
		if (data.paymentMethod) {
			paymentMethod = deep_clone(data.paymentMethod)
			const expiry = paymentMethod.Expiry.split('/')
			this.expiryMonth$.$ = parseInt(expiry[0])
			this.expiryYear$.$ = expiry[1]
		} else {
			paymentMethod = new PaymentMethod()
			this.expiryMonth$.$ = CARD_MONTHS[0].value
			this.expiryYear$.$ = CARD_YEARS[0].value
		}
		this.paymentMethod$.$ = paymentMethod
	}
	readonly savePaymentMethod = async ()=>{
		log(this.ctx, Controller_name, 'savePaymentMethod')
		let paymentMethod = this.paymentMethod$.$
		assign(paymentMethod, {
			Expiry: ([this.expiryMonth$.$, this.expiryYear$.$] as string[]).join('/'),
			CardHolder: ([paymentMethod.Billing_FirstName, paymentMethod.Billing_LastName] as string[]).join(' ')
		})
		this.paymentMethod$.refresh()
		this.busy$.$ = true
		try {
			const payload = await this.ro_httpClient.save_API_PAYMENT_METHODS({
				paymentMethod: this.paymentMethod$.$
			})
			if (payload.Code === 'ADD_PAYMENT_METHOD') {
				paymentMethod = payload.Data
				this.paymentMethod$.$ = paymentMethod
				await this.notyf_success('Successfully added payment method.')
				await this.close({
					paymentMethod: paymentMethod,
					action: 'add'
				})
			} else if (payload.Code === 'UPDATE_PAYMENT_METHOD') {
				await this.notyf_success('Successfully updated payment method.')
				await this.close({
					paymentMethod: paymentMethod,
					action: 'update'
				})
			}
			if (payload.Status === STATUS_ERROR) {
				await this.notyf_error('Please provide correct information')
			}
			log(this.ctx, 'save_userPayment()', payload)
		} finally {
			this.busy$.$ = false
		}
	}
}
