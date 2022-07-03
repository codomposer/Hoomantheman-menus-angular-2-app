import type { BaseUser_I } from './BaseUser_I.js'
export class BaseUser implements BaseUser_I {
	ID:number
	FirstName:string
	LastName:string
	Email:string
	Phone:string
	PlatformCompanyID:number
}
