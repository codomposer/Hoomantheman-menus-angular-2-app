import { writable$, noinit_subscribe, Writable$ } from '@ctx-core/store'
import { BaseController, confirmModal$_b } from '@menus/shared-ui'
import { log, merge } from '@menus/util'
import type { PaymentMethod_I } from '@menus/ro-shared-models'
import { STATUS_SUCCESS } from '@menus/web-config'
import { PaymentMethodAPIRequestQuery, ro_httpClient_b } from '@menus/ro-http'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import type { SavePaymentMethodModal_I } from '../SavePaymentMethodModal'
import type { ro_billing_ui_Ctx } from '../ro_billing_ui_Ctx.js'
export const PAGINATION_ID = 'MANAGE_PAYMENTS_PAGINATION_ID'
const Controller_name = 'ManagePayments_c'
export class ManagePayments_c extends BaseController<ro_billing_ui_Ctx> {
	readonly confirmModal$ = confirmModal$_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly SavePaymentMethodModal_i$:Writable$<SavePaymentMethodModal_I> = writable$(null)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly page$:Writable$<number> = writable$(1)
	readonly pageSize$:Writable$<number> = writable$(25)
	readonly TotalPages$:Writable$<number> = writable$(0)
	readonly TotalRow$:Writable$<number> = writable$(0)
	readonly payment_methods$:refresh_writable_T<PaymentMethod_I[]> = refresh_writable_([])
	readonly keywords$:Writable$<string> = writable$('')
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.unsubscribers.push(
			noinit_subscribe(this.page$, this.API_PAYMENT_METHODS_list),
			noinit_subscribe(this.pageSize$, this.API_PAYMENT_METHODS_list),
		)
		this.API_PAYMENT_METHODS_list().then()
	};
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly API_PAYMENT_METHODS_list = async ()=>{
		log(this.ctx, Controller_name, 'API_PAYMENT_METHODS_list()')
		this.busy$.$ = true
		try {
			const requestData = new PaymentMethodAPIRequestQuery()
			PaymentMethodAPIRequestQuery.fill_search(requestData, this.keywords$.$)
			PaymentMethodAPIRequestQuery.fill_page(requestData, this.page$.$)
			PaymentMethodAPIRequestQuery.fill_pageSize(requestData, this.pageSize$.$)
			const payload = await this.ro_httpClient.API_PAYMENT_METHODS_list(requestData)
			if (payload.Code === STATUS_SUCCESS) {
				this.payment_methods$.$ = payload.Data
				// this.TotalPages$ = payload.Pagination.TotalPages
				// this.TotalRow$ = payload.Pagination.TotalRow
			}
			log(this.ctx, Controller_name, 'API_PAYMENT_METHODS_list', payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly search_text_Enter = async ()=>{
		this.page$.$ = 1
		await this.API_PAYMENT_METHODS_list()
	}
	readonly open_SavePaymentMethodModal_i = async (paymentMethod?:PaymentMethod_I)=>{
		const data = await this.SavePaymentMethodModal_i$.$.open({
			paymentMethod
		})
		if (!data) return
		if (data.action === 'add') {
			const paymentMethods = this.payment_methods$.$
			paymentMethods.push(data.paymentMethod)
			this.payment_methods$.$ = paymentMethods
		}
		if (data.action === 'update') {
			merge(paymentMethod, data.paymentMethod)
			this.payment_methods$.refresh()
		}
	}
	readonly delete_payment_method = async (paymentMethodIndex, paymentMethod:PaymentMethod_I)=>{
		const confirm = await this.confirmModal$.$.open({
			message: `Are you sure you want to delete ${paymentMethod.CardHolder}?`,
		})
		if (confirm) {
			log(this.ctx, Controller_name, 'delete_payment_method()')
			this.busy$.$ = true
			try {
				const requestData = new PaymentMethodAPIRequestQuery()
				requestData.i = paymentMethod.ID
				const payload = await this.ro_httpClient.API_PAYMENT_METHODS_del(requestData)
				if (payload.Code === 'DELETE_PAYMENT_METHOD') {
					const payment_methods = this.payment_methods$.$
					payment_methods.splice(paymentMethodIndex, 1)
					this.payment_methods$.$ = payment_methods
					this.notyf_success('Successfully deleted payment method.')
				} else {
					this.notyf_error('Unable to delete item, Please try later.')
				}
				log(this.ctx, Controller_name, 'delete_payment_method', payload)
			} finally {
				this.busy$.$ = false
			}
		}
	}
}
