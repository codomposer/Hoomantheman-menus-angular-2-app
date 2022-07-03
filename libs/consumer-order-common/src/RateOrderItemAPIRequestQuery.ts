import { UserAPIRequestQuery } from '@menus/consumer-user-common'
import type { OrderItem } from '@menus/shared-order'
export class RateOrderItemAPIRequestQuery extends UserAPIRequestQuery {
	public a:string // Order Item Image ID
	public m:number // Item ID
	public c:string // CustomerComment
	public d:number // CustomerRating
	public e:number // Order ID
	public b:number // index
	public o:string // order number
	public static fillOrderItem = (requestData:RateOrderItemAPIRequestQuery, orderItem:OrderItem)=>{
		requestData.m = orderItem.ItemID
		requestData.c = orderItem.CustomerComment
		requestData.d = orderItem.CustomerRating
		requestData.e = orderItem.OrderID
	}
}
