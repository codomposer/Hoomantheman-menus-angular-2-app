import { neq_ } from '@ctx-core/function'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { is_path_routing } from '@menus/core-routing'
import type { ro_user_common_Ctx } from '@menus/ro-user-common'
import { ro_isLoggedIn$_b } from '@menus/ro-user-common'
import { timeout_ms } from '@menus/web-config'
export async function ro_redirect_home_url_(ctx:ro_user_common_Ctx) {
	const ro_isLoggedIn$ = ro_isLoggedIn$_b(ctx)
	return (
		is_path_routing
		? '/backoffice'
		: await subscribe_wait_timeout(ro_isLoggedIn$, neq_(null), timeout_ms)
			? '/backoffice/manage-restaurant'
			: '/backoffice/login'
	)
}
