import type { B } from '@ctx-core/object'
import { login_user$__b, login_user$_T } from '@menus/user-common'
import type { Ro_User } from './Ro_User.js'
import type { ro_user_common_Ctx } from './ro_user_common_Ctx.js'
export const ro_login_user$_b:B<ro_user_common_Ctx, keyof ro_user_common_Ctx, login_user$_T<Ro_User>> =
	login_user$__b<Ro_User, ro_user_common_Ctx>(
		key=>`ro_${key}` as keyof ro_user_common_Ctx
	)
export type ro_login_user$_T = login_user$_T<Ro_User>
