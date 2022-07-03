import type { SoldOutAction } from './SoldOutAction.js'
export interface User_I {
	ID:number
	FirstName:string
	LastName:string
	MiddleName:string
	Login:string
	UserName:string
	ConfirmPassword:string
	ConfirmEmail:string
	IsEmailValidated:boolean
	Phone:string
	IsPhoneValidated:boolean
	Enabled:boolean
	AuthCode:string
	LastLogin:string
	LastIP:string
	SecurityQuestionID:number
	SecurityQuestion:string
	SecurityAnswer:string
	SocialPicture:string
	SoldOutAction:SoldOutAction
	Points:number
	AllowReviewOrderCount:number
}
