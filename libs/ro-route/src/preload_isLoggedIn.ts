import type { page_T, PreloadContext } from '@ctx-core/sapper'
import { ssr_ui_ctx_, ui_ctx__session_T } from '@menus/ui'
import { ro_isLoggedIn_noauth_url_ } from './ro_is_logged_in_noauth_url_.js'
export async function preload_isLoggedIn(
	this:PreloadContext, page:page_T, session:ui_ctx__session_T
):Promise<string|undefined> {
	const ctx = ssr_ui_ctx_(page, session)
	const noauth_url = await ro_isLoggedIn_noauth_url_(ctx)
	if (noauth_url) {
		this.redirect(302, noauth_url)
		return noauth_url
	}
}
