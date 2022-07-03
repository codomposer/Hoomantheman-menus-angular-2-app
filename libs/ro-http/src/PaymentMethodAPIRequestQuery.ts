import type { PaymentMethod } from '@menus/ro-shared-models'
import { UserAPIRequestQuery } from '@menus/consumer-user'
export class PaymentMethodAPIRequestQuery extends UserAPIRequestQuery {
	public search:string
	public p:number
	public ps:number
	public i:number // ID
	public cn:string // CardNumber
	public xp:string // Expiry
	public v:string // CVV
	public chn:string // Cardholder
	public bf:string // Billing_FirstName
	public bl:string // Billing_LastName
	public ba:string // Billing_Address
	public ba2:string // Billing_Address2
	public bc:string // Billing_City
	public bs:string // Billing_State
	public bz:string // Billing_Zip
	private static fillBillingInfo(requestData:PaymentMethodAPIRequestQuery, paymentMethod:PaymentMethod) {
		requestData.bf = paymentMethod.Billing_FirstName
		requestData.bl = paymentMethod.Billing_LastName
		requestData.ba = paymentMethod.Billing_Address
		requestData.ba2 = paymentMethod.Billing_Address2
		requestData.bc = paymentMethod.Billing_City
		requestData.bs = paymentMethod.Billing_State
		requestData.bz = paymentMethod.Billing_Zip
	}
	public static fillPaymentMethodID(requestData:PaymentMethodAPIRequestQuery, paymentMethod:PaymentMethod) {
		requestData.i = paymentMethod.ID
	}
	public static fillPaymentMethodForCreate(requestData:PaymentMethodAPIRequestQuery, paymentMethod:PaymentMethod) {
		requestData.cn = paymentMethod.CardNumber
		requestData.xp = paymentMethod.Expiry
		requestData.v = paymentMethod.CVV
		requestData.chn = paymentMethod.CardHolder
		PaymentMethodAPIRequestQuery.fillBillingInfo(requestData, paymentMethod)
	}
	public static fillPaymentMethodForUpdate(requestData:PaymentMethodAPIRequestQuery, paymentMethod:PaymentMethod) {
		PaymentMethodAPIRequestQuery.fillPaymentMethodID(requestData, paymentMethod)
		PaymentMethodAPIRequestQuery.fillBillingInfo(requestData, paymentMethod)
	}
	public static fill_search(requestData:PaymentMethodAPIRequestQuery, search:string) {
		requestData.search = search
	}
	public static fill_page(requestData:PaymentMethodAPIRequestQuery, page:number) {
		requestData.p = page
	}
	public static fill_pageSize(requestData:PaymentMethodAPIRequestQuery, pageSize:number) {
		requestData.ps = pageSize
	}
}
