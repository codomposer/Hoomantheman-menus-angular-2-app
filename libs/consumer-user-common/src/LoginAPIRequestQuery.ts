import { Md5 } from '@menus/ts-md5'
import { APIRequestQuery } from '@menus/api'
import type { UserWithLogin } from '@menus/user-common'
export class LoginAPIRequestQuery extends APIRequestQuery {
	public static ACTION_LOGIN = 'login'
	public static ACTION_LOGOUT = 'logout'
	public static LOGIN_ACCOUNT_TEXT = ['Menu', 'Facebook', 'Google', 'Apple']
	public static LOGIN_MENU_ACCOUNT = 0
	public static LOGIN_FACEBOOK_ACCOUNT = 1
	public static LOGIN_GOOGLE_ACCOUNT = 2
	public static LOGIN_APPLE_ACCOUNT = 3
	public username:string
	public password:string
	public act:string
	public access_token:string
	public sn_id:number
	public e:string // Email
	public authcode:string
	public static fill_user = (
		requestData:LoginAPIRequestQuery,
		user:UserWithLogin,
	)=>{
		requestData.username = user.Email
		requestData.password = user.Password ? (Md5.hashStr(user.Password) as string) : ''
	}
}
