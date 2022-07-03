import type { page_T, PreloadContext } from '@ctx-core/sapper'
import { ssr_ui_ctx_, ui_ctx__session_T } from '@menus/ui'
import { is_admin_noauth_url_ } from './is_admin_noauth_url_.js'
import type { ro_route_Ctx } from './ro_route_Ctx.js'
export async function preload_is_admin(
	this:PreloadContext, page:page_T, session:ui_ctx__session_T
):Promise<string|undefined> {
	const ctx = ssr_ui_ctx_(page, session) as ro_route_Ctx
	const noauth_url = await is_admin_noauth_url_(ctx)
	if (noauth_url) {
		this.redirect(302, noauth_url)
		return noauth_url
	}
}
