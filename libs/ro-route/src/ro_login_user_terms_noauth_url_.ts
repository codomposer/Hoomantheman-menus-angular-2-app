import { has_dom } from '@ctx-core/dom'
import { neql_ } from '@ctx-core/function'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { ro_login_user$_b, Ro_User } from '@menus/ro-user-common'
import { timeout_ms } from '@menus/web-config'
import type { ro_route_Ctx } from './ro_route_Ctx.js'
export async function ro_login_user_terms_noauth_url_(
	ctx:ro_route_Ctx
):Promise<string|undefined> {
	if (has_dom) {
		const ro_login_user$ = ro_login_user$_b(ctx)
		const ro_login_user = await subscribe_wait_timeout(
			ro_login_user$, neql_(undefined), timeout_ms
		) as Ro_User
		if (!ro_login_user?.Terms) {
			return '/backoffice/terms-conditions'
		}
	}
}
