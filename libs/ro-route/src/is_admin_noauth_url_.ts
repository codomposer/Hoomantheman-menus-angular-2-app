import { I } from '@ctx-core/combinators'
import { has_dom } from '@ctx-core/dom'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { is_admin_role$_b } from '@menus/ro-user-common'
import { timeout_ms } from '@menus/web-config'
import type { ro_route_Ctx } from './ro_route_Ctx.js'
export async function is_admin_noauth_url_(ctx:ro_route_Ctx):Promise<string|undefined> {
	if (has_dom) {
		const is_admin_role$ = is_admin_role$_b(ctx)
		const is_admin_role = await subscribe_wait_timeout(is_admin_role$, I, timeout_ms)
		if (!is_admin_role) {
			return '/backoffice/login.js'
		}
	}
}
