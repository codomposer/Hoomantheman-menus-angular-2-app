import type { isLoggedIn$_T } from '@menus/user-common'
import { ro_login_user$_b } from './ro_login_user$_b.js'
import type { ro_user_common_Ctx } from './ro_user_common_Ctx.js'
export function ro_isLoggedIn$_b(ctx:ro_user_common_Ctx):ro_isLoggedIn$_T {
	return ro_login_user$_b(ctx).isLoggedIn$
}
export type ro_isLoggedIn$_T = isLoggedIn$_T
