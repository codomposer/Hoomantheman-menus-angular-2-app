import { consumer_http_Ctx } from '@menus/consumer-http'
import { notyf_Ctx } from '@menus/notyf'
import { set_default_userPayment_T } from './set_default_userPayment_b.js'
export interface user_payment_ui_Ctx extends consumer_http_Ctx, notyf_Ctx {
	set_default_userPayment:set_default_userPayment_T
}
