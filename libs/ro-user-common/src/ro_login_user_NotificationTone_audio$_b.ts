import { B, be_ } from '@ctx-core/object'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import type { ro_user_common_Ctx } from './ro_user_common_Ctx.js'
import { ro_login_user_NotificationTone_path$_b } from './ro_login_user_NotificationTone_path$_b.js'
const key = 'ro_login_user_NotificationTone_audio$'
export const ro_login_user_NotificationTone_audio$_b:B<ro_user_common_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_login_user_NotificationTone_path$ = ro_login_user_NotificationTone_path$_b(ctx)
	const ro_login_user_NotificationTone_audio$ = refresh_writable_<HTMLAudioElement>(null)
	ro_login_user_NotificationTone_path$.subscribe(ro_login_user_NotificationTone_path=>{
		ro_login_user_NotificationTone_audio$.set(
			ro_login_user_NotificationTone_path ? new Audio(ro_login_user_NotificationTone_path) : null
		)
	})
	return ro_login_user_NotificationTone_audio$ as ro_login_user_NotificationTone_audio$_T
})
export type ro_login_user_NotificationTone_audio$_T = refresh_writable_T<HTMLAudioElement>
