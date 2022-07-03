import { B, be_ } from '@ctx-core/object'
import { UserPayment_I, UserPaymentAPIRequestQuery } from '@menus/user-payment-common'
import { consumer_http_client_b } from '@menus/consumer-http'
import { userPayments$_b } from '@menus/user-payment'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import type { user_payment_ui_Ctx } from './user_payment_ui_Ctx.js'
const key = 'set_default_userPayment'
export const set_default_userPayment_b:B<user_payment_ui_Ctx, typeof key> = be_(key, ctx=>{
	const consumer_http_client = consumer_http_client_b(ctx)
	const userPayments$ = userPayments$_b(ctx)
	const notyf_success = notyf_success_b(ctx)
	const notyf_error = notyf_error_b(ctx)
	return set_default_userPayment as set_default_userPayment_T
	async function set_default_userPayment(userPayment:UserPayment_I) {
		const requestData = new UserPaymentAPIRequestQuery()
		requestData.a = userPayment.ID
		const payload = await consumer_http_client.set_default_userPayment(requestData)
		if (payload.Code === 'SET_DEFAULT_CREDIT_CARD') {
			for (const userPayment of userPayments$.$) {
				userPayment.Is_Default = false
			}
			userPayment.Is_Default = true
			userPayments$.refresh()
			notyf_success('Successfully set default credit card.')
		} else if (payload.Code === 'ERROR_OCCURRED') {
			notyf_error(
				'There is a problem with this payment method.<br>Please update your payment method & try again.'
			)
			userPayment.has_error = true
		}
	}
})
export type set_default_userPayment_T =
	(userPayment:UserPayment_I)=>Promise<void>
