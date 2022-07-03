import type { UserPayment_I } from './UserPayment_I.js'
export class UserPayment implements UserPayment_I {
	public ID:number
	public CardNumber:string
	public Expiry:string
	public CVV:string
	public CardHolder:string
	public Billing_FirstName:string
	public Billing_LastName:string
	public Billing_Address:string
	public Billing_Address2:string
	public Billing_City:string
	public Billing_State:string
	public Billing_Zip:string
	public CardType:string
	public CardTypeImageURL:string
	public Is_Default:boolean
	// ux fields
	public busy:boolean
	public has_error:boolean
	public static getDefaultOrFirst($userPayments:UserPayment[]):UserPayment {
		let userPayment:UserPayment
		for (const i in $userPayments) {
			if (!$userPayments.hasOwnProperty(i)) continue
			const payment = $userPayments[i]
			if (payment.Is_Default) {
				userPayment = payment
				break
			}
		}
		if (!userPayment && typeof $userPayments !== 'undefined' && $userPayments && $userPayments.length > 0) {
			userPayment = $userPayments[0]
		}
		return userPayment
	}
}
