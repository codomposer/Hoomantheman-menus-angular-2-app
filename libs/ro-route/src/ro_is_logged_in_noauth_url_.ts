import { has_dom } from '@ctx-core/dom'
import { neq_ } from '@ctx-core/function'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { ro_isLoggedIn$_b } from '@menus/ro-user-common'
import { timeout_ms } from '@menus/web-config'
import type { ro_route_Ctx } from './ro_route_Ctx.js'
export async function ro_isLoggedIn_noauth_url_(
	ctx:ro_route_Ctx
):Promise<string|undefined> {
	if (has_dom) {
		const ro_isLoggedIn$ = ro_isLoggedIn$_b(ctx)
		const ro_isLoggedIn = await subscribe_wait_timeout(
			ro_isLoggedIn$, neq_(null), timeout_ms
		)
		if (!ro_isLoggedIn) {
			return '/backoffice/login.js'
		}
	}
}
