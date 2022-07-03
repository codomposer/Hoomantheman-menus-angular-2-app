import { neq_ } from '@ctx-core/function'
import { B, be_ } from '@ctx-core/object'
import { no_dom } from '@ctx-core/dom'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { ro_login_user$_b } from '@menus/ro-user-common'
import { timeout_ms } from '@menus/web-config'
import { RoRequestQuery } from './RoRequestQuery.js'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
const key = 'fill_login_user'
export const fill_login_user_b:B<ro_http_Ctx, typeof key> = be_(key, ctx=>{
	const ro_login_user$ = ro_login_user$_b(ctx)
	return fill_login_user
	async function fill_login_user(requestData:Partial<RoRequestQuery_I>) {
		if (no_dom) return requestData
		const ro_login_user = await subscribe_wait_timeout(ro_login_user$, neq_(null), timeout_ms)
		RoRequestQuery.fill_login_user(requestData, ro_login_user)
		return requestData
	}
})
export type fill_login_user_T = (requestData:Partial<RoRequestQuery_I>)=>Promise<Partial<RoRequestQuery_I>>
