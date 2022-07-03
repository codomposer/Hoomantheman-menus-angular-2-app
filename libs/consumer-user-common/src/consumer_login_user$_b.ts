import type { Be } from '@ctx-core/object'
import { nullish } from '@ctx-core/function'
import { login_user$__b, login_user$_T, User } from '@menus/user-common'
import type { consumer_user_common_Ctx } from './consumer_user_common_Ctx.js'
export const consumer_login_user$_b:Be<consumer_user_common_Ctx, keyof consumer_user_common_Ctx, consumer_login_user$_T> =
	login_user$__b<User, consumer_user_common_Ctx>(
		subkey=>`consumer_${subkey}` as 'consumer_login_user$'
	)
export type consumer_login_user_T = User|nullish
export type consumer_login_user$_T = login_user$_T<consumer_login_user_T>
