import { B, be_ } from '@ctx-core/object'
import { page_query$_b } from '@ctx-core/sapper'
import { derived$, Readable$ } from '@ctx-core/store'
import type { SEARCH_VIEW_T } from '@menus/web-config'
import type { page_Ctx } from './page_Ctx.js'
const key = 'query_search_view$'
export const query_search_view$_b:B<page_Ctx, typeof key> = be_(key, ctx=>{
	const page_query$ = page_query$_b(ctx)
	return derived$(page_query$, page_query=>{
		const search_view = page_query?.search_view as string
		return search_view ? (search_view as SEARCH_VIEW_T) : null
	}) as query_search_view$_T
})
export type query_search_view$_T = Readable$<SEARCH_VIEW_T|null>
