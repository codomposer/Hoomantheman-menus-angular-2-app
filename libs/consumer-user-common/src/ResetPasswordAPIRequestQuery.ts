import { Md5 } from '@menus/ts-md5'
import { APIRequestQuery } from '@menus/api'
import type { ResetPassword } from './ResetPassword'
export class ResetPasswordAPIRequestQuery extends APIRequestQuery {
	public r:string // reset code
	public p:string // password
	public p2:string // confirm password
	public static fill_reset_password(
		requestData:ResetPasswordAPIRequestQuery,
		reset_password:ResetPassword,
	) {
		requestData.r = reset_password.reset_code
		requestData.p = (
			Md5.hashStr(reset_password.new_password) as string)
		requestData.p2 = (
			Md5.hashStr(reset_password.confirm_password) as string)
	}
}
