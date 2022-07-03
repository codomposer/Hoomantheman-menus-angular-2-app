import { APIRequestQuery } from '@menus/api'
import type { UserWithLogin } from '@menus/user-common'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
export class RoLoginAPIRequestQuery extends APIRequestQuery implements Partial<RoRequestQuery_I> {
	public e:string // Email
	public p:string // Password
	qt:string
	public static fill_user = (requestData:RoLoginAPIRequestQuery, user:UserWithLogin)=>{
		requestData.e = user.Email
		requestData.p = user.Password
		// requestData.p = <string> Md5.hashStr(user.password);
	}
}
