import { B, be_ } from '@ctx-core/object'
import { consumer_http_client_b } from '@menus/consumer-http'
import { CloseAccountAPIRequestQuery, consumer_login_user$_b, User } from '@menus/consumer-user-common'
import { consumer_home_url__b } from '@menus/route'
import { confirmModal$_b, messageModal$_b } from '@menus/shared-ui'
import { goto_b } from '@menus/ui'
import type { consumer_user_ui_Ctx } from './consumer_user_ui_Ctx.js'
const key = 'close_account'
export const close_account_b:B<consumer_user_ui_Ctx, typeof key> = be_(key, ctx=>{
	const confirmModal$ = confirmModal$_b(ctx)
	const consumer_home_url_ = consumer_home_url__b(ctx)
	const consumer_http_client = consumer_http_client_b(ctx)
	const consumer_login_user$ = consumer_login_user$_b(ctx)
	const goto = goto_b(ctx)
	const messageModal$ = messageModal$_b(ctx)
	return close_account as close_account_T
	async function close_account() {
		const confirm = await confirmModal$.$.open({
			message: 'Are you sure you would like to close your account?' +
				' By clicking on the "yes" below, all of your data will be deleted.' +
				' You will have to create a new account if you would like to use our services in the future.',
			ok_class: 'btn-danger',
			cancel_class: 'btn-success',
		})
		if (!confirm) return false
		const requestData = new CloseAccountAPIRequestQuery()
		CloseAccountAPIRequestQuery.fill_customer(requestData, consumer_login_user$.$ as User)
		const payload = await consumer_http_client.close_account(requestData)
		if (payload.Code !== 'SET_CUSTOMER_ACCOUNT_FOR_DELETION') return false
		consumer_login_user$.logout()
		await messageModal$.$.open({
			title: 'Thank You',
			message: 'We have successfully initiated your account deletion request.' +
				' You will receive an email with further details.'
		})
		const consumer_home_url = await consumer_home_url_()
		if (consumer_home_url) {
			await goto(consumer_home_url)
		}
	}
})
export type close_account_T = ()=>Promise<boolean>
