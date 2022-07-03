import { tup } from '@ctx-core/array'
import { I } from '@ctx-core/combinators'
import { run } from '@ctx-core/function'
import { writable$, derived$, Readable$, subscribe_wait_timeout, Writable$ } from '@ctx-core/store'
import { BaseModalController } from '@menus/modal'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import type { SavePaymentMethodModal_I } from '@menus/ro-billing-ui'
import {
	API_PAYMENT_METHODS_list_payload_T, PaymentMethodAPIRequestQuery, ro_httpClient_b, RoRequestQuery
} from '@menus/ro-http'
import { PaymentMethod } from '@menus/ro-shared-models'
import { globalSettings$_b } from '@menus/ro-user'
import { GlobalSettings, Subscription } from '@menus/ro-user-common'
import { refresh_writable_ } from '@menus/store'
import { log } from '@menus/util'
import { STATUS_SUCCESS, timeout_ms } from '@menus/web-config'
import type { ro_restaurant_ui_Ctx } from '../ro_restaurant_ui_Ctx.js'
import type {
	SubscriptionCheckoutModal_close_T, SubscriptionCheckoutModal_open_T, SubscriptionCheckoutModal_I
} from './SubscriptionCheckoutModal_I.js'
const Controller_name = 'SubscriptionCheckoutModal_c.js'
export class SubscriptionCheckoutModal_c
	extends BaseModalController<SubscriptionCheckoutModal_open_T, SubscriptionCheckoutModal_close_T, ro_restaurant_ui_Ctx>
	implements SubscriptionCheckoutModal_I {
	readonly SavePaymentMethodModal_i$ = writable$<SavePaymentMethodModal_I>(null)
	readonly globalSettings$ = globalSettings$_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly ChangeSubscription_busy$:Writable$<boolean> = writable$(false)
	readonly CancelNextSubscription_busy$ = writable$<boolean>(false)
	readonly changeSubscription_errors$ = writable$<string[]>([])
	readonly currentSubscription$ = writable$<Subscription>(new Subscription())
	fireFlyID:string
	readonly isSavePaymentMethodModalOpen$ = writable$<boolean>(null)
	readonly nextSubscription$ = writable$<Subscription>(new Subscription())
	readonly nextSubscriptionStartDate$ = writable$<string>(null)
	readonly payment_methods$ = refresh_writable_<PaymentMethod[]>(null)
	readonly selectedPaymentMethodID$:Writable$<number> = writable$(null)
	readonly selectedSubscription$ = writable$<Subscription>(new Subscription())
	readonly Subscription_Expired$ = writable$<boolean>(null)
	readonly Subscription_Expiration$ = writable$<string>(null)
	readonly subscriptions$ = writable$<Subscription[]>(null)
	readonly yearlyPayment$ = writable$<boolean>(true)
	readonly setupFees$ = derived$<Readable$<Subscription>, number>(this.selectedSubscription$,//region
		selectedSubscription=>
			selectedSubscription.SetupFee || 0
	)//endregion
	readonly subtotal$ = derived$<[Readable$<Subscription>, Readable$<boolean>, Readable$<number>], number>(//region
		[this.selectedSubscription$, this.yearlyPayment$, this.setupFees$],
		([selectedSubscription, yearlyPayment, setupFees]:[Subscription, boolean, number])=>{
			const monthlyValue = selectedSubscription.MonthlyValue || 0
			return (
				(yearlyPayment && selectedSubscription?.YearlyDiscountPercent)
				? (12 * monthlyValue) + setupFees
				: monthlyValue + setupFees
			)
		}
	)//endregion
	readonly discount$ = derived$<[Readable$<Subscription>, Readable$<boolean>, Readable$<number>], number>(//region
		[this.selectedSubscription$, this.yearlyPayment$, this.subtotal$],
		([selectedSubscription, yearlyPayment, $subtotal]:[Subscription, boolean, number])=>{
			return (
				(yearlyPayment && selectedSubscription?.YearlyDiscountPercent)
				? $subtotal * (selectedSubscription?.YearlyDiscountPercent / 100)
				: 0
			) || 0
		})//endregion
	readonly fee_messages$:Readable$<string[]> = derived$(this.selectedSubscription$,//region
		(selectedSubscription)=>{
			if (!selectedSubscription) return []
			const { ServiceFeePercent, ServiceFeeFlat, Name } = selectedSubscription
			const preposition =
				(Name === 'Pro')
				? 'Credit Card rates based on Braintree'
				: 'Service Fees of'
			const percent_plus_flat =
				`${ServiceFeePercent ? `${ServiceFeePercent}` : ''}${
					ServiceFeePercent && ServiceFeeFlat ? ' + ' : ''}${
					ServiceFeeFlat ? `$${ServiceFeeFlat}` : ''
				}`
			const postposition =
				(Name === 'Pro')
				? 'per transaction will apply.'
				: 'per order will apply.'
			const first_sentence = `${preposition} ${percent_plus_flat} ${postposition}`
			return (
				Name === 'Pro'
				? [first_sentence]
				: [first_sentence, 'Credit Card (2.9% + $0.3 per transaction) is included.']
			)
		})//endregion
	readonly total$:Readable$<number> = derived$(tup(this.subtotal$, this.discount$),//region
		([subtotal, discount])=>
			(subtotal as number) - (discount as number))//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.unsubscribers.push(
			this.selectedPaymentMethodID$.subscribe(()=>{
				this.changeSubscription_errors$.$ = []
			})
		)
	};
	async onDestroy() {
		if (this.ctx[Controller_name] === this) {
			delete this.ctx[Controller_name]
		}
		await super.onDestroy()
	}
	readonly before_open_modal = async (data:SubscriptionCheckoutModal_open_T)=>{
		log(this.ctx, Controller_name, 'init()', data)
		this.fireFlyID = data.fireFlyID
		this.currentSubscription$.$ = data.currentSubscription
		this.nextSubscription$.$ = data.nextSubscription
		this.nextSubscriptionStartDate$.$ = data.nextSubscriptionStartDate
		this.Subscription_Expired$.$ = data.Subscription_Expired
		this.Subscription_Expiration$.$ = data.Subscription_Expiration
		this.load_data().then()
	}
	readonly load_data = async ()=>{
		log(this.ctx, Controller_name, 'load_data()')
		this.busy$.$ = true
		try {
			const [globalSettings, API_PAYMENT_METHODS_list_payload] =
				await Promise.all([
					subscribe_wait_timeout(this.globalSettings$, I, timeout_ms),
					run(async ()=>{
						const requestData = new PaymentMethodAPIRequestQuery()
						return this.ro_httpClient.API_PAYMENT_METHODS_list(requestData)
					})
				]) as [GlobalSettings, API_PAYMENT_METHODS_list_payload_T]
			const subscriptions = globalSettings.Subscription
			this.subscriptions$.$ = subscriptions
			if (subscriptions.length) {
				this.selectedSubscription$.$ =
					this.Subscription_Expired$.$
					? subscriptions[0]
					: (
						this.subscriptions$.$.find(
							subscription=>
								subscription.Name === this.currentSubscription$.$?.Name
						) || subscriptions[0]
					)
			}
			this.payment_methods$.$ = API_PAYMENT_METHODS_list_payload.Data.map(
				data=>new PaymentMethod(data)
			)
			const paymentMethod = PaymentMethod.getDefaultOrFirst(this.payment_methods$.$)
			if (paymentMethod) {
				this.selectedPaymentMethodID$.$ = paymentMethod.ID
			}
		} finally {
			this.busy$.$ = false
		}
	}
	readonly add_payment_method = async ()=>{
		this.isSavePaymentMethodModalOpen$.$ = true
		const data = await this.SavePaymentMethodModal_i$.$.open({
			paymentMethod: null
		})
		if (data) {
			if (data.action === 'add') {
				const paymentMethod:PaymentMethod = data.paymentMethod
				this.payment_methods$.$.push(paymentMethod)
				this.payment_methods$.refresh()
				this.selectedPaymentMethodID$.$ = paymentMethod.ID
			}
		}
		this.isSavePaymentMethodModalOpen$.$ = false
		console.log(this.ctx, 'add_payment_method closed')
	}
	readonly changeSubscription = async ()=>{
		this.ChangeSubscription_busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			RoRequestQuery.fill_fireFlyID(requestData, this.fireFlyID)
			requestData.pid = this.selectedSubscription$.$.ID
			if (this.selectedSubscription$.$.MonthlyValue) {
				requestData.ccid = this.selectedPaymentMethodID$.$
			}
			const payload = await this.ro_httpClient.API_BILLING_upgrade(requestData)
			if (payload.Status === STATUS_SUCCESS) {
				this.notyf_success('Your subscription request has been processed successfully.')
				await this.close({ subscription: this.selectedSubscription$.$ })
			} else {
				this.changeSubscription_errors$.$ = [
					`Unable to process your subscription request. Please add or validate your payment method.`
				]
			}
		} finally {
			this.ChangeSubscription_busy$.$ = false
		}
	}
	readonly cancelNextSubscription = async ()=>{
		this.CancelNextSubscription_busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			RoRequestQuery.fill_fireFlyID(requestData, this.fireFlyID)
			const payload = await this.ro_httpClient.API_BILLING_cancel_next_subscription(requestData)
			if (payload.Status === STATUS_SUCCESS) {
				this.notyf_success('Your subscription request has been processed successfully.')
				await this.close({
					subscription: this.selectedSubscription$.$
				})
			} else {
				this.notyf_error('Unable to process your subscription request, Please try again later.')
			}
		} finally {
			this.CancelNextSubscription_busy$.$ = false
		}
	}
}
