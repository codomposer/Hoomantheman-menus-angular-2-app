import type { Ro_User } from '@menus/ro-user-common'
import { APIRequestQuery } from '@menus/api'
export class RoUserAPIRequestQuery extends APIRequestQuery {
	// public x: string; // Ro_User Auth Code
	public uid:number // Ro_User ID
	public static fill_login_user(requestData:RoUserAPIRequestQuery, $ro_user:Ro_User) {
		// requestData.x = $ro_user.AuthCode
		requestData.uid = $ro_user.id
	}
}
