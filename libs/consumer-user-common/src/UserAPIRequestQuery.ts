import { APIRequestQuery } from '@menus/api'
import type { User } from '@menus/user-common'
import type { consumer_login_user_T } from './consumer_login_user$_b.js'
export class UserAPIRequestQuery extends APIRequestQuery {
	public x:string // User Auth Code
	public i:number // User ID
	public static fill_login_user(data:UserAPIRequestQuery, consumer_login_user:consumer_login_user_T) {
		data.x = (consumer_login_user as User)?.AuthCode
		data.i = (consumer_login_user as User)?.ID
	}
}
