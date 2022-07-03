import { writable$, Writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { UserPaymentAPIRequestQuery, UserPayment_I, userPayments$_b } from '@menus/user-payment'
import { log, error_message_ } from '@menus/util'
import { consumer_http_client_b } from '@menus/consumer-http'
import type { SaveUserPaymentModal_I } from '../SaveUserPaymentModal'
import type { user_payment_ui_Ctx } from '../user_payment_ui_Ctx.js'
export class UserPayments_c extends BaseController<user_payment_ui_Ctx> {
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly userPayments$ = userPayments$_b(this.ctx)
	readonly saveUserPaymentModal$:Writable$<SaveUserPaymentModal_I|null> = writable$(null)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly errorMessage$:Writable$<string|null> = writable$(null)
	readonly successMessage$:Writable$<string|null> = writable$(null)
	readonly openAddUserPaymentModal = async (userPayment?:UserPayment_I)=>{
		await this.saveUserPaymentModal$.$?.open({ userPayment })
	}
	readonly delete_userPayment = async (userPayment:UserPayment_I)=>{
		this.busy$.$ = true
		try {
			const requestData = new UserPaymentAPIRequestQuery()
			UserPaymentAPIRequestQuery.fill_userPaymentID(requestData, userPayment)
			const payload = await this.consumer_http_client.delete_userPayment(requestData)
			if (payload?.Code === 'DELETE_CREDIT_CARD') {
				const userPaymentIndex = this.userPayments$.$.indexOf(userPayment)
				if (~userPaymentIndex) {
					this.userPayments$.$.splice(userPaymentIndex, 1)
					this.userPayments$.refresh()
				}
				this.successMessage$.$ = payload.Message
			} else {
				this.errorMessage$.$ = error_message_('delete payment method')
			}
			log(this.ctx, 'user payments ', payload)
		} finally {
			this.busy$.$ = false
		}
	}
}
