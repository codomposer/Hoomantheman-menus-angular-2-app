import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { RO_USER_LEVEL_TITLES } from '@menus/web-config'
import { ro_login_user_UserLevel$_b } from './ro_login_user_UserLevel$_b.js'
import type { ro_user_common_Ctx } from './ro_user_common_Ctx.js'
const key = 'ro_login_user_UserLevel_title$'
export const ro_login_user_UserLevel_title$_b:B<ro_user_common_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_login_user_UserLevel = ro_login_user_UserLevel$_b(ctx)
	return derived$(ro_login_user_UserLevel, $ro_login_user_UserLevel=>
		RO_USER_LEVEL_TITLES[$ro_login_user_UserLevel]
	) as ro_login_user_UserLevel_title$_T
})
export type ro_login_user_UserLevel_title$_T = Readable$<string>
