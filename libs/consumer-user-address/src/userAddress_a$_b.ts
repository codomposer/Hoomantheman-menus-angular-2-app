import type { nullish } from '@ctx-core/function'
import { B, be_, assign, nullish_or_ } from '@ctx-core/object'
import { readable$_set_ctx_, derived$, Readable$ } from '@ctx-core/store'
import type { UserAddress } from '@menus/user-address-common'
import { consumer_login_user$_b, UserAPIRequestQuery } from '@menus/consumer-user-common'
import { userAddress_from_userAddress_payload_, consumer_http_client_b } from '@menus/consumer-http'
import type { ready$_T } from '@menus/store'
import type { consumer_user_address_Ctx } from './consumer_user_address_Ctx.js'
const key = 'userAddress_a$'
export const userAddress_a$_b:B<consumer_user_address_Ctx, typeof key> = be_(key, ctx=>{
	const consumer_login_user$ = consumer_login_user$_b(ctx)
	const consumer_http_client$ = consumer_http_client_b(ctx)
	const { store: busy$, set: set_busy } = readable$_set_ctx_<boolean>(false)
	const { store: userAddress_a$, set } = readable$_set_ctx_<UserAddress[]|nullish>(undefined)
	consumer_login_user$.subscribe(async ()=>
		await reload()
	)
	const ready$ = derived$(busy$,
		userAddress_a$_busy=>!userAddress_a$_busy)
	return assign(userAddress_a$, {
		ready$, refresh, reload, busy$,
	}) as userAddress_a$_T
	function refresh() {
		set(userAddress_a$.$)
	}
	async function reload() {
		const consumer_login_user = consumer_login_user$.$
		if (!consumer_login_user) {
			set(nullish_or_(consumer_login_user, ()=>undefined))
			return
		}
		if (userAddress_a$.$ === null) {
			set(null)
		}
		set_busy(true)
		try {
			let userAddress_a = null
			if (consumer_login_user) {
				const requestData = new UserAPIRequestQuery()
				const payload = await consumer_http_client$.get_userAddresses(requestData)
				if (payload.Status === 'error') {
					console.error(payload)
					userAddress_a = []
				} else {
					userAddress_a = payload.map(userAddress_from_userAddress_payload_)
				}
			}
			set(userAddress_a)
			return userAddress_a
		} finally {
			set_busy(false)
		}
	}
})
export type userAddress_a$_busy$_T = Readable$<boolean>
export interface userAddress_a$_T extends Readable$<UserAddress[]|nullish> {
	ready$:ready$_T
	refresh():void
	reload():Promise<UserAddress[]|nullish>
	busy$:userAddress_a$_busy$_T
}
