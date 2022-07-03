import { UserAPIRequestQuery } from '@menus/consumer-user-common'
import type { UserPayment_I } from './UserPayment_I.js'
export class UserPaymentAPIRequestQuery extends UserAPIRequestQuery {
	public a:number // ID
	public c:string // CardNumber
	public d:string // Expiry
	public e:string // CVV
	public f:string // Cardholder
	public af:string // Billing_FirstName
	public al:string // Billing_LastName
	public aa:string // Billing_Address
	public ab:string // Billing_Address2
	public ac:string // Billing_City
	public as:string // Billing_State
	public az:string // Billing_Zip
	private static fillBillingInfo(requestData:UserPaymentAPIRequestQuery, userPayment:UserPayment_I) {
		requestData.af = userPayment.Billing_FirstName
		requestData.al = userPayment.Billing_LastName
		requestData.aa = userPayment.Billing_Address
		requestData.ab = userPayment.Billing_Address2
		requestData.ac = userPayment.Billing_City
		requestData.as = userPayment.Billing_State
		requestData.az = userPayment.Billing_Zip
	}
	public static fill_userPaymentID(requestData:UserPaymentAPIRequestQuery, userPayment:UserPayment_I) {
		requestData.a = userPayment.ID
	}
	public static fill_userPayment_for_create(requestData:UserPaymentAPIRequestQuery, userPayment:UserPayment_I) {
		requestData.c = userPayment.CardNumber
		requestData.d = userPayment.Expiry
		requestData.e = userPayment.CVV
		requestData.f = userPayment.CardHolder
		UserPaymentAPIRequestQuery.fillBillingInfo(requestData, userPayment)
	}
	public static fill_userPayment_for_update(requestData:UserPaymentAPIRequestQuery, userPayment:UserPayment_I) {
		UserPaymentAPIRequestQuery.fill_userPaymentID(requestData, userPayment)
		UserPaymentAPIRequestQuery.fillBillingInfo(requestData, userPayment)
	}
}
