import { UserAPIRequestQuery } from '@menus/consumer-user-common'
export class OrderDetailsAPIRequestQuery extends UserAPIRequestQuery {
	public o:number // Order ID
	public b:number // Item ID
}
