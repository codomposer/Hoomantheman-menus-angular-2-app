import { APIRequestQuery } from '@menus/api'
export class GetVisibleCouponsRequestQuery extends APIRequestQuery {
	public a:string // FFID
	public b:number // ServiceTypeID
	public i?:number // login_user.ID
	public x?:string // login_user.AuthCode
}
