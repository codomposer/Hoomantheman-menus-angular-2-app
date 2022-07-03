import { derived$, Readable$, writable$, Writable$ } from '@ctx-core/store'
import { BaseModalController } from '@menus/modal'
import { is_new_o_, log } from '@menus/util'
import { UserPayment, UserPayment_I } from '@menus/user-payment'
import { notyf_success_b } from '@menus/notyf'
import { consumer_http_client_b } from '@menus/consumer-http'
import { CARD_MONTHS, CARD_YEARS } from '@menus/web-config'
import type {
	SaveUserPaymentModal_close_T, SaveUserPaymentModal_open_T, SaveUserPaymentModal_I
} from './SaveUserPaymentModal_I.js'
import { set_default_userPayment_b } from '../set_default_userPayment_b.js'
import type { user_payment_ui_Ctx } from '../user_payment_ui_Ctx.js'
const Controller_name = 'SaveUserPaymentModal_c'
export class SaveUserPaymentModal_c
	extends BaseModalController<SaveUserPaymentModal_open_T, SaveUserPaymentModal_close_T, user_payment_ui_Ctx>
	implements SaveUserPaymentModal_I {
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly set_default_userPayment = set_default_userPayment_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly expiryMonth$:Writable$<number> = writable$(CARD_MONTHS[0].value)
	readonly expiryYear$:Writable$<string> = writable$(CARD_YEARS[0].value)
	readonly userPayment$:Writable$<UserPayment_I> = writable$(new UserPayment())
	readonly card_errors$:Writable$<string[]> = writable$([])
	readonly isNewUserPayment$:Readable$<boolean> = derived$(//region
		this.userPayment$, (userPayment:UserPayment)=>is_new_o_(userPayment)
	)//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly before_open_modal = async (data:SaveUserPaymentModal_open_T)=>{
		this.userPayment$.$ = data.userPayment || new UserPayment()
	}
	readonly save_userPayment = async ()=>{
		log(this.ctx, Controller_name, 'save_userPayment')
		this.busy$.$ = true
		try {
			let userPayment = this.userPayment$.$
			const Expiry = `${this.expiryMonth$.$}/${this.expiryYear$.$}`
			const CardHolder = `${this.userPayment$.$.Billing_FirstName} ${this.userPayment$.$.Billing_LastName}`
			userPayment.Expiry = Expiry
			userPayment.CardHolder = CardHolder
			const payload = await this.consumer_http_client.save_userPayment({
				userPayment
			})
			const { Code } = payload
			if (Code === 'ADD_CREDIT_CARD') {
				userPayment = payload.Data[0]
				this.notyf_success('Successfully added payment method.')
				await this.close({
					userPayment,
					action: 'add'
				})
			} else if (Code === 'UPDATE_BILLING_ADDRESS') {
				this.notyf_success('Successfully updated payment method.')
				await this.close({
					userPayment,
					action: 'update'
				})
			} else if (Code === 'ERROR_OCCURRED') {
				this.card_errors$.$ = [/\[(.*)\]/.exec(payload.Message)[1]]
			}
			await this.set_default_userPayment(userPayment)
			log(this.ctx, 'save_userPayment()', payload)
		} finally {
			this.busy$.$ = false
		}
	}
}
