import { getContext } from 'svelte'
import type { page_ctx_T } from './page_ctx_T.js'
import { page_ctx_key } from './page_ctx_key.js'
export function getContext_page_ctx() {
	return getContext(page_ctx_key) as page_ctx_T
}
