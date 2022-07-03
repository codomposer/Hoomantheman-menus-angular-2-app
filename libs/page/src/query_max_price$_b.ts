import { B, be_ } from '@ctx-core/object'
import { page_query$_b } from '@ctx-core/sapper'
import { derived$, Readable$ } from '@ctx-core/store'
import type { page_Ctx } from './page_Ctx.js'
const key = 'query_max_price$'
export const query_max_price$_b:B<page_Ctx, typeof key> = be_(key, ctx=>{
	const page_query$ = page_query$_b(ctx)
	return derived$(page_query$, page_query=>{
		const max_price = page_query?.max_price as string
		return max_price ? parseFloat(max_price) : null
	}) as query_max_price$_T
})
export type query_max_price$_T = Readable$<number>
