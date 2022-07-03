import { B, be_ } from '@ctx-core/object'
import { run } from '@ctx-core/function'
import { ro_login_user$_b } from '@menus/ro-user-common'
import { idfa_info_, is_idfa } from '@menus/web-cordova'
import { API_SAVE_INFO_b } from './API_SAVE_INFO_b.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import { RoRequestQuery } from './RoRequestQuery.js'
const key = 'watch_API_SAVE_INFO'
export const watch_API_SAVE_INFO_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_login_user$ = ro_login_user$_b(ctx)
	ro_login_user$.isLoggedIn$.subscribe(isLoggedIn=>{
		if (isLoggedIn && is_idfa) {
			run(async ()=>{
				const idfa_info = await idfa_info_()
				const ro_login_user = ro_login_user$.$
				const body = {
					a: idfa_info.appleTracking ? 1 : 0,
					x: ro_login_user.AuthCode,
					i: ro_login_user.id,
				}
				const requestData = new RoRequestQuery()
				await API_SAVE_INFO_b(ctx)(requestData, body)
			}).then()
		}
	})
	return {}
})
export type watch_API_SAVE_INFO_T = {}
