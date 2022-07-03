import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { page_query$_b } from '@ctx-core/sapper'
import type { page_Ctx } from './page_Ctx.js'
const key = 'query_pageSize$'
export const query_pageSize$_b:B<page_Ctx, typeof key> = be_(key, ctx=>{
	const page_query$ = page_query$_b(ctx)
	return derived$(page_query$, page_query=>
		parseInt(page_query?.pageSize as string)
	) as query_pageSize$_T
})
export type query_pageSize$_T = Readable$<number>
