import type { PaymentMethod_I } from './PaymentMethod_I.js'
export class PaymentMethod implements PaymentMethod_I {
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
	// custom fields
	public busy:boolean
	/**
	 * constructor
	 */
	constructor(data = {}) {
		Object.assign(this, data)
		// this.CardNumber = '5555555555554444';
		// this.Expiry = '12/18';
		// this.CVV = '123';
		// this.Billing_FirstName = 'Abuzer';
		// this.Billing_LastName = 'Asif';
		// this.Billing_Address = 'Test Address';
		// this.Billing_City = 'Test City';
		// this.Billing_State = 'Test State';
		// this.Billing_Zip = 'Test Zip';
	}
	public static getDefaultOrFirst(paymentMethods:PaymentMethod[]):PaymentMethod {
		let paymentMethod:PaymentMethod
		for (const i in paymentMethod) {
			const payment = paymentMethods[i]
			if (payment.Is_Default) {
				paymentMethod = payment
				break
			}
		}
		if (!paymentMethod && typeof paymentMethods !== 'undefined' && paymentMethods && paymentMethods.length > 0) {
			paymentMethod = paymentMethods[0]
		}
		return paymentMethod
	}
}
