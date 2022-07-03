export interface OrderAPIRequestQuery_I {
	b:number; // Order ID
	c:number; // DeliveryAddressID
	d:number; // SubTotal
	e:number; // Delivery
	f:number; // Total
	g:any; // ETA
	h:any; // Distance
	//  j: any; // DrivingDistance
	k:any; // PaymentMethod
	dtp:number; // DriverTipPercent
	//  dt: any; // DriverTip
	l:number; // CreditCardID
	m:string; // AptSuiteNo
	n:string; // DeliveryNotes
	r:string; // FireFly id
	s:number; // ServiceType
}
export const PAYMENT_METHOD_COD = 1
export const PAYMENT_METHOD_CREDIT_CARD = 2
