import { has_dom } from '@ctx-core/dom'
import { neql_, nullish } from '@ctx-core/function'
import { query_str_ } from '@ctx-core/uri'
import { ro_auth_redirects_T, ro_auth_redirects$_b } from '@menus/ro-user-common'
import type { page_T, preload_T, PreloadContext } from '@ctx-core/sapper'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { ssr_ui_ctx_, ui_ctx__session_T } from '@menus/ui'
import { timeout_ms } from '@menus/web-config'
import type { ro_route_Ctx } from './ro_route_Ctx.js'
export function ro_auth_redirects_preload_(auth_rules_key:string):preload_T<ui_ctx__session_T> {
	return async function preload(this:PreloadContext, page:page_T, session:ui_ctx__session_T) {
		if (has_dom) {
			const ctx:ro_route_Ctx = ssr_ui_ctx_(page, session)
			const ro_auth_redirects$ = ro_auth_redirects$_b(ctx)
			const ro_auth_redirects:ro_auth_redirects_T|nullish =
				await subscribe_wait_timeout(ro_auth_redirects$, neql_(undefined), timeout_ms)
			const redirect_url:string = ro_auth_redirects?.[auth_rules_key]
			if (redirect_url) {
				this.redirect(302, `${redirect_url}${query_str_({
					returnUrl: `${page.path}${query_str_(page.query)}`,
				})}`)
			}
		}
	}
}
