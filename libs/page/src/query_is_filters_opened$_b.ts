import { B, be_ } from '@ctx-core/object'
import { page_query$_b } from '@ctx-core/sapper'
import { derived$, Readable$ } from '@ctx-core/store'
import type { page_Ctx } from './page_Ctx.js'
const key = 'query_is_filters_opened$'
export const query_is_filters_opened$_b:B<page_Ctx, typeof key> = be_(key, (ctx)=>{
	const page_query$ = page_query$_b(ctx)
	const query_is_filters_opened$ = derived$(page_query$, page_query=>{
		const is_filters_opened = page_query?.is_filters_opened as string
		return is_filters_opened ? !!parseInt(is_filters_opened) : null
	})
	return query_is_filters_opened$ as query_is_filters_opened$_T
})
export type query_is_filters_opened$_T = Readable$<boolean|null>
