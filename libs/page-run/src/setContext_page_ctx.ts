import { setContext } from 'svelte'
import { has_dom } from '@ctx-core/dom'
import type { page_ctx_T } from './page_ctx_T.js'
import { page_ctx_key } from './page_ctx_key.js'
export function setContext_page_ctx(ctx:page_ctx_T) {
	if (has_dom) {
		window.page_ctx = ctx
	}
	setContext(page_ctx_key, ctx)
}
declare global {
	interface Window {
		page_ctx:page_ctx_T
	}
}
