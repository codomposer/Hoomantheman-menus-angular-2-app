import { B, be_ } from '@ctx-core/object'
import { isEmail, isNumberOnly, isPhone } from '@menus/util'
import { ForgotPasswordAPIRequestQuery } from '@menus/consumer-user-common'
import { notyf_error_b } from '@menus/notyf'
import { consumer_http_client_b, send_forgot_password_payload_T } from '@menus/consumer-http'
import type { consumer_auth_ui_Ctx } from '../consumer_auth_ui_Ctx.js'
const key = 'send_forgot_password'
export const send_forgot_password_b:B<consumer_auth_ui_Ctx, typeof key> = be_(key, ctx=>{
	const consumer_http_client = consumer_http_client_b(ctx)
	const notyf_error = notyf_error_b(ctx)
	return send_forgot_password
	async function send_forgot_password(in_phone_email:string) {
		let valid = true
		const requestData = new ForgotPasswordAPIRequestQuery()
		const phone_email = in_phone_email
		if (isNumberOnly(phone_email)) {
			// Value is phone number
			requestData.p = phone_email
			if (!isPhone(requestData.p)) {
				notyf_error('Please enter a valid phone number.')
				valid = false
			}
		} else {
			// Value is email
			requestData.e = phone_email
			if (!isEmail(requestData.e)) {
				notyf_error('Please enter a valid e-mail address.')
				valid = false
			}
		}
		if (valid) {
			return await consumer_http_client.send_forgot_password(requestData)
		}
	}
})
export type send_forgot_password_T =
	(in_phone_email:string)=>Promise<send_forgot_password_payload_T>
