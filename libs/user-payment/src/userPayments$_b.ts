import { neql_ } from '@ctx-core/function'
import { B, be_, assign } from '@ctx-core/object'
import { readable$_set_ctx_, Readable$, subscribe_wait_timeout } from '@ctx-core/store'
import { log } from '@menus/util'
import { consumer_login_user_T, consumer_login_user$_b, UserAPIRequestQuery } from '@menus/consumer-user-common'
import { consumer_http_client_b } from '@menus/consumer-http'
import type { UserPayment_I } from '@menus/user-payment-common'
import { timeout_ms } from '@menus/web-config'
import type { user_payment_Ctx } from './user_payment_Ctx.js'
const LOG_TAG = 'userPayments$_b.js'
const key = 'userPayments$'
export const userPayments$_b:B<user_payment_Ctx, typeof key> = be_(key, ctx=>{
	const consumer_http_client = consumer_http_client_b(ctx)
	const consumer_login_user$ = consumer_login_user$_b(ctx)
	const { store: userPayments_busy$, set: set_userPayments_busy } = readable$_set_ctx_<boolean>(false)
	const { store: userPayments$, set: set_userPayments } = readable$_set_ctx_<UserPayment_I[]>(null)
	consumer_login_user$.subscribe(()=>reload())
	return assign(userPayments$, {
		userPayments_busy$,
		refresh,
		reload,
	}) as userPayments$_T
	function refresh() {
		set_userPayments(userPayments$.$)
	}
	async function reload() {
		log(ctx, LOG_TAG, 'load_data')
		set_userPayments_busy(true)
		try {
			await subscribe_wait_timeout(consumer_login_user$.ready$, neql_(undefined), timeout_ms)
			const consumer_login_user = consumer_login_user$.$ as consumer_login_user_T
			if (!consumer_login_user) {
				set_userPayments([])
				return
			}
			const requestData = new UserAPIRequestQuery()
			const userPayments = await consumer_http_client.get_userPayments(requestData)
			if (userPayments.Status === 'error') {
				console.error(LOG_TAG, 'error', userPayments)
				return
			}
			set_userPayments(userPayments)
			log(ctx, LOG_TAG, 'userPayments', userPayments)
		} finally {
			set_userPayments_busy(false)
		}
	}
})
export type userPayments_busy$_T = Readable$<boolean>
export interface userPayments$_T extends Readable$<UserPayment_I[]> {
	userPayments_busy$:userPayments_busy$_T
	refresh():void
	reload():Promise<void>
}
