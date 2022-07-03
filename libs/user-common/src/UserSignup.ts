import { UserWithLogin } from './UserWithLogin.js'
export class UserSignup extends UserWithLogin {
	public FirstName:string
	public LastName:string
	public UserName:string
	public ConfirmPassword:string
	public ConfirmEmail:string
	public Phone:string
	public SecurityQuestionID:number
	public SecurityAnswer:string
}
