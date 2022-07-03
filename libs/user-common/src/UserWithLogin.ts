import type { UserWithLogin_I } from './UserWithLogin_I.js'
export class UserWithLogin implements UserWithLogin_I {
	Email:string
	Password:string
	AuthCode?:string
}
