import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { find_notification_tone } from '@menus/notification-tone'
import { ro_login_user$_b } from './ro_login_user$_b.js'
import type { ro_user_common_Ctx } from './ro_user_common_Ctx.js'
import type { Ro_User } from './Ro_User'
const key = 'ro_login_user_NotificationTone_path$'
export const ro_login_user_NotificationTone_path$_b:B<ro_user_common_Ctx, typeof key> = be_(key, ctx=>{
	const ro_login_user$ = ro_login_user$_b(ctx)
	return derived$(ro_login_user$, ro_login_user=>{
		const notification = (ro_login_user as Ro_User)?.NotificationTone.split('.')[0]
		return notification ? find_notification_tone(notification) : null
	}) as ro_login_user_NotificationTone_path$_T
})
export type ro_login_user_NotificationTone_path$_T = Readable$<string>
