import { Md5 } from '@menus/ts-md5'
import type { ChangePassword } from './ChangePassword.js'
import { UserAPIRequestQuery } from './UserAPIRequestQuery.js'
export class ChangePasswordAPIRequestQuery extends UserAPIRequestQuery {
	public p:string // Old password
	public p1:string // New password
	public p2:string // New Confirm password
	public static fill_userPassword = (
		requestData:ChangePasswordAPIRequestQuery,
		userPassword:ChangePassword,
	)=>{
		requestData.p = (Md5.hashStr(userPassword.currentPassword) as string)
		requestData.p1 = (Md5.hashStr(userPassword.new_password) as string)
		requestData.p2 = (Md5.hashStr(userPassword.confirm_password) as string)
	}
}
