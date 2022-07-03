export interface UserPayment_I {
	ID:number
	CardNumber:string
	Expiry:string
	CVV:string
	CardHolder:string
	Billing_FirstName:string
	Billing_LastName:string
	Billing_Address:string
	Billing_Address2:string
	Billing_City:string
	Billing_State:string
	Billing_Zip:string
	CardType:string
	CardTypeImageURL:string
	Is_Default:boolean
	// ux fields
	busy:boolean
	has_error:boolean
}
