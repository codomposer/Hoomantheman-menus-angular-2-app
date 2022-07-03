import { B, be_ } from '@ctx-core/object'
import { I } from '@ctx-core/combinators'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { timeout_ms } from '@menus/web-config'
import type { User } from '@menus/user-common'
import { consumer_login_user$_b } from './consumer_login_user$_b.js'
import type { consumer_user_common_Ctx } from './consumer_user_common_Ctx.js'
const key = 'assign_AllowReviewOrderCount'
export const assign_AllowReviewOrderCount_b:B<consumer_user_common_Ctx, typeof key> = be_(key, ctx=>{
	const consumer_login_user$ = consumer_login_user$_b(ctx)
	return assign_AllowReviewOrderCount
	async function assign_AllowReviewOrderCount(value) {
		const consumer_login_user = await subscribe_wait_timeout(
			consumer_login_user$, I, timeout_ms
		) as User
		consumer_login_user.AllowReviewOrderCount = parseInt(value, 10)
		consumer_login_user$.refresh()
	}
})
export type assign_AllowReviewOrderCount_T = (value:number)=>void
