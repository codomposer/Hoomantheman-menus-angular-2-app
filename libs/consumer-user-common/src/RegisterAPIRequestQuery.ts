import { Md5 } from '@menus/ts-md5'
import type { UserSignup } from '@menus/user-common'
import { UserAPIRequestQuery } from './UserAPIRequestQuery.js'
export class RegisterAPIRequestQuery extends UserAPIRequestQuery {
	public f:string // Firstname
	public l:string // Lastname
	public u:string // Username
	public e:string // Email
	public ph:string // Phone
	public p:string // Password
	public p2:string // Password
	public e2:string // Email
	public s:number // SecurityQuestionID
	public t:string // SecurityQuestion
	public static fill_user = (requestData:RegisterAPIRequestQuery, user:UserSignup)=>{
		requestData.f = user.FirstName
		requestData.l = user.LastName
		requestData.u = user.UserName
		requestData.e = user.Email
		requestData.e2 = user.ConfirmEmail
		requestData.ph = user.Phone
		requestData.p = Md5.hashStr(user.Password) as string
		requestData.p2 = Md5.hashStr(user.ConfirmPassword) as string
		requestData.s = user.SecurityQuestionID
		requestData.t = user.SecurityAnswer
	}
}
