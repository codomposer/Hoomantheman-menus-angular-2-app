import { setContext } from 'svelte'
import { has_dom } from '@ctx-core/dom'
import { ui_ctx_key } from './ui_ctx_.js'
import { ui_Ctx } from './ui_Ctx.js'
export function setContext_ui_ctx(ctx:ui_Ctx) {
	if (has_dom) {
		window.ctx = ctx
		window.ui_ctx = ctx
	}
	setContext(ui_ctx_key, ctx)
}
