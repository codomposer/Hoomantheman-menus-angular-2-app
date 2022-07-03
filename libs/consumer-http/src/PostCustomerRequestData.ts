import { APIRequestQuery } from '@menus/api'
export class PostCustomerRequestData extends APIRequestQuery {
	public a:string // Tracking
	public x?:string // login_user.AuthCode
	public i?:string // login_user.ID
}
