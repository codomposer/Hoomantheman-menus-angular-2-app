import { B, be_ } from '@ctx-core/object'
import { consumer_login_user$_b } from './consumer_login_user$_b.js'
import type { consumer_user_common_Ctx } from './consumer_user_common_Ctx.js'
import { User } from '@menus/user-common'
const key = 'add_points'
export const add_points_b:B<consumer_user_common_Ctx, typeof key> = be_(key, ctx=>{
	const consumer_login_user$ = consumer_login_user$_b(ctx)
	return add_points as add_points_T
	function add_points(points:number) {
		const consumer_login_user = consumer_login_user$.$ as User
		consumer_login_user.Points += points
		consumer_login_user$.refresh()
	}
})
export type add_points_T = (points:number)=>void
