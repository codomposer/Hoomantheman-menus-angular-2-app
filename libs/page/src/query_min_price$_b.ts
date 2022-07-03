import { B, be_ } from '@ctx-core/object'
import { page_query$_b } from '@ctx-core/sapper'
import { derived$, Readable$ } from '@ctx-core/store'
import type { page_Ctx } from './page_Ctx.js'
const key = 'query_min_price$'
export const query_min_price$_b:B<page_Ctx, typeof key> = be_(key, ctx=>{
	const page_query$ = page_query$_b(ctx)
	return derived$(page_query$, page_query=>{
		const min_price = page_query?.min_price as string
		return min_price ? parseFloat(min_price) : null
	}) as query_min_price$_T
})
export type query_min_price$_T = Readable$<number|null>
