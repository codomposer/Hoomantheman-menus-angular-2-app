import { BaseUser_I, UserWithLogin } from '@menus/user'
import type { Ro_User_I } from './Ro_User_I.js'
export class Ro_User extends UserWithLogin implements BaseUser_I, Ro_User_I {
	public id:number
	public FirstName:string
	public LastName:string
	public MiddleName:string
	public Login:string
	public Email:string
	public Password:string
	public ConfirmPassword:string
	public UserLevel:number
	public Enabled:boolean
	public Vicidial:number
	public QuickBlox_UserID:number
	public Terms:boolean
	public NotificationTone:string
	public EmailVerified:boolean
	public ShowPlatformMenu:boolean
	public ShowRestTabNav:boolean
	public CallRestaurant:boolean
}
