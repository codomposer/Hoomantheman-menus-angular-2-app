import { neq_ } from '@ctx-core/function'
import { B, be_ } from '@ctx-core/object'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { timeout_ms } from '@menus/web-config'
import { ro_login_user$_b } from './ro_login_user$_b.js'
import type { ro_user_common_Ctx } from './ro_user_common_Ctx.js'
import { Ro_User } from './Ro_User'
const key = 'setNotificationTone'
export const setNotificationTone_b:B<ro_user_common_Ctx, typeof key> = be_(key, ctx=>{
	const ro_login_user$ = ro_login_user$_b(ctx)
	return setNotificationTone as setNotificationTone_T
	async function setNotificationTone(NotificationTone:string) {
		const ro_login_user = await subscribe_wait_timeout(
			ro_login_user$, neq_(null), timeout_ms
		) as Ro_User
		ro_login_user.NotificationTone = NotificationTone
		ro_login_user$.$ = ro_login_user
	}
})
export type setNotificationTone_T = (tone:string)=>void
