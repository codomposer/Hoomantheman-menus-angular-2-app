import type { SoldOutAction } from './SoldOutAction.js'
import { UserWithLogin } from './UserWithLogin.js'
export class User extends UserWithLogin implements User_ui_T {
	public ID:number
	public FirstName:string
	public LastName:string
	public MiddleName:string
	public Login:string
	public UserName:string
	public ConfirmPassword:string
	public ConfirmEmail:string
	public IsEmailValidated:boolean
	public Phone:string
	public IsPhoneValidated:boolean
	public Enabled:boolean
	public LastLogin:string
	public LastIP:string
	public SecurityQuestionID:number
	public SecurityQuestion:string
	public SecurityAnswer:string
	public SocialPicture:string
	public SoldOutAction:SoldOutAction
	public Points:number
	public AllowReviewOrderCount:number
	public sn_id:number
	public SocialNetworkID: number
}
export interface User_ui_T {
	sn_id:number
}
