import { APIRequestQuery } from '@menus/api'
export class ForgotPasswordAPIRequestQuery extends APIRequestQuery {
	protected static DELIVERY_MODE_EMAIL = 1
	protected static DELIVERY_MODE_PHONE = 2
	public c:number // DeliveryMode, // 1 = Email, 2 = Phone
	public e:string // Email,
	public p:string // Phone,
	public s:string // SecurityQuestionAnswer
}
