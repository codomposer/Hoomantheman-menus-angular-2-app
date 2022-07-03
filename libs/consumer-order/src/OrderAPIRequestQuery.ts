import { UserAPIRequestQuery, } from '@menus/consumer-user-common'
import type { UserAddress, } from '@menus/user-address-common'
import type { UserPayment_I } from '@menus/user-payment'
import type { RestaurantCartitem_I } from '@menus/shopping-cart'
import { OrderAPIRequestQuery_I, PAYMENT_METHOD_CREDIT_CARD } from './OrderAPIRequestQuery_I.js'
export class OrderAPIRequestQuery extends UserAPIRequestQuery implements OrderAPIRequestQuery_I {
	public b:number // Order ID
	public c:number // DeliveryAddressID
	public d:number // SubTotal
	public dt:number // DriverTip
	public dtp:number // DriverTipPercent
	public e:number // Delivery
	public f:number // Total
	public g:any // ETA
	public h:any // Distance
	public j:any // DrivingDistance
	public k:any // PaymentMethod
	public l:number // CreditCardID
	public m:string // AptSuiteNo
	public n:string // DeliveryNotes
	public o:number // Order ID
	public r:string // FireFly id
	public s:number // ServiceType
	public st:string // Scheduled Time
	public static fill_userAddress = (requestData:OrderAPIRequestQuery_I, userAddress:UserAddress)=>{
		requestData.c = userAddress.ID
	}
	public static fill_userPayment = (requestData:OrderAPIRequestQuery_I, userPayment:UserPayment_I)=>{
		requestData.k = PAYMENT_METHOD_CREDIT_CARD
		requestData.l = userPayment.ID
	}
	public static fill_cartitem = (requestData:OrderAPIRequestQuery_I, restaurant_cartitem:RestaurantCartitem_I)=>{
		const { menu_cartitems } = restaurant_cartitem
		requestData.d = restaurant_cartitem.subTotal
		requestData.e = restaurant_cartitem.delivery
		requestData.f = restaurant_cartitem.total
		requestData.g = menu_cartitems[0].menuitem.ETA
		// TODO: verify if we need to use restaurant_cartitem.distance
		requestData.h = 0
		// requestData.h = menu_cartitems[0].distance;
		requestData.r = menu_cartitems[0].menuitem.FFID
	}
}
