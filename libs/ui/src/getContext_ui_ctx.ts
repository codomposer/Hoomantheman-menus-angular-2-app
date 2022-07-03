import { getContext } from 'svelte'
import { ui_ctx_key } from './ui_ctx_.js'
import type { ui_Ctx } from './ui_Ctx.js'
export function getContext_ui_ctx():ui_Ctx {
	return getContext(ui_ctx_key)
}
