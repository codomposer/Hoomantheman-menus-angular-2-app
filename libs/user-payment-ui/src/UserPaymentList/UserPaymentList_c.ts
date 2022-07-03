import { Writable$, writable$ } from '@ctx-core/store'
import { BaseController, confirmModal$_b } from '@menus/shared-ui'
import { UserPayment, UserPaymentAPIRequestQuery, UserPayment_I, userPayments$_b } from '@menus/user-payment'
import { log, merge } from '@menus/util'
import { consumer_http_client_b, set_default_userPayment_payload_T } from '@menus/consumer-http'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import type { SaveUserPaymentModal_I } from '../SaveUserPaymentModal'
import { set_default_userPayment_b } from '../set_default_userPayment_b.js'
import type { user_payment_ui_Ctx } from '../user_payment_ui_Ctx.js'
const Controller_name = 'UserPaymentList_c'
export class UserPaymentList_c extends BaseController<user_payment_ui_Ctx> {
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly confirmModal$ = confirmModal$_b(this.ctx)
	readonly in_set_default_userPayment = set_default_userPayment_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly userPayments$ = userPayments$_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly saveUserPaymentModal$:Writable$<SaveUserPaymentModal_I> = writable$(null)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly edit_userPayment = async (userPayment?:UserPayment_I)=>{
		log(this.ctx, Controller_name, 'edit_userPayment', userPayment)
		const data = await this.saveUserPaymentModal$.$.open({ userPayment })
		const data_$userPayment = data.userPayment
		if (userPayment) {
			merge(userPayment, data_$userPayment)
		} else if (data_$userPayment) {
			this.userPayments$.$.push(data_$userPayment)
		}
		await this.userPayments$.refresh()
		log(this.ctx, Controller_name, 'openAddNewAddressModal', data)
	}
	readonly delete_userPayment = async (userPaymentIndex:number, userPayment:UserPayment)=>{
		const confirm = await this.confirmModal$.$.open({
			message: `Are you sure you want to delete ${userPayment.CardHolder}?`,
		})
		if (confirm) {
			log(this.ctx, Controller_name, 'delete_userPayment')
			userPayment.busy = true
			this.userPayments$.refresh()
			try {
				const requestData = new UserPaymentAPIRequestQuery()
				requestData.a = userPayment.ID
				const payload = await this.consumer_http_client.delete_userPayment(requestData)
				if (payload.Code === 'DELETE_CREDIT_CARD') {
					this.userPayments$.$.splice(userPaymentIndex, 1)
					this.notyf_success('Successfully deleted credit card.')
				}
				log(this.ctx, 'delete_userPayment()', payload)
			} finally {
				userPayment.busy = false
				this.userPayments$.refresh()
			}
		}
	}
	readonly set_default_userPayment = async (userPayment:UserPayment)=>{
		log(this.ctx, Controller_name, 'set_default_userPayment')
		this.busy$.$ = true
		let payload:set_default_userPayment_payload_T
		try {
			await this.in_set_default_userPayment(userPayment)
		} finally {
			this.busy$.$ = false
			log(this.ctx, 'set_default_userPayment()', payload)
		}
	}
}
