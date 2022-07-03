import { APIRequestQuery } from '@menus/api'
import type { User } from '@menus/user-common'
export class CloseAccountAPIRequestQuery extends APIRequestQuery {
	public x:string // CustomerAuthCode
	public i:string // CustomerID
	public static fill_customer(requestData:CloseAccountAPIRequestQuery, consumer_login_user:User) {
		requestData.x = consumer_login_user.AuthCode
		requestData.i = consumer_login_user.ID.toString()
	}
}
