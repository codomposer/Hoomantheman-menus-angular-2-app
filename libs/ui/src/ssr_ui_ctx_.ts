import type { PageContext } from '@ctx-core/sapper'
import { Page, page$_b } from '@ctx-core/sapper'
import type { ui_Ctx } from './ui_Ctx.js'
import { ui_ctx_, ui_ctx__session_T } from './ui_ctx_.js'
export function ssr_ui_ctx_(page:Page|PageContext, session:ui_ctx__session_T):ui_Ctx {
	const ui_ctx =
		session.ui_ctx
		? session.ui_ctx
		: (()=>{
			const ui_ctx = ui_ctx_(page, session)
			const page$ = page$_b(ui_ctx)
			page$.$ = page
			return ui_ctx
		})()
	return ui_ctx
}
