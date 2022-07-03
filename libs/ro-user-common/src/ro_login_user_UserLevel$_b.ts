import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { ro_login_user$_b } from './ro_login_user$_b.js'
import type { ro_user_common_Ctx } from './ro_user_common_Ctx.js'
import type { Ro_User } from './Ro_User'
const key = 'ro_login_user_UserLevel$'
export const ro_login_user_UserLevel$_b:B<ro_user_common_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_login_user$ = ro_login_user$_b(ctx)
	const ro_login_user_UserLevel = derived$(ro_login_user$,
		(ro_login_user:Ro_User)=>
			ro_login_user?.UserLevel
	)
	return ro_login_user_UserLevel as ro_login_user_UserLevel$_T
})
export type ro_login_user_UserLevel$_T = Readable$<number>
