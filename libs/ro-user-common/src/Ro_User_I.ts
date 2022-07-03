import type { UserWithLogin_I } from '@menus/user'
export interface Ro_User_I extends UserWithLogin_I {
	id:number
	FirstName:string
	LastName:string
	MiddleName:string
	Login:string
	ConfirmPassword:string
	UserLevel:number
	Enabled:boolean
	Vicidial:number
	QuickBlox_UserID:number
	Terms:boolean
	NotificationTone:string
	EmailVerified:boolean
	ShowPlatformMenu:boolean
	ShowRestTabNav:boolean
	CallRestaurant:boolean
}
