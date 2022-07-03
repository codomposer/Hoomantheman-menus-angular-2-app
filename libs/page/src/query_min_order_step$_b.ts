import { B, be_ } from '@ctx-core/object'
import { page_query$_b } from '@ctx-core/sapper'
import { derived$, Readable$ } from '@ctx-core/store'
import type { page_Ctx } from './page_Ctx.js'
const key = 'query_min_order_step$'
export const query_min_order_step$_b:B<page_Ctx, typeof key> = be_(key, ctx=>{
	const page_query$ = page_query$_b(ctx)
	return derived$(page_query$, page_query=>{
		const min_order = page_query?.min_order as string
		return min_order ? parseFloat(min_order) : null
	}) as query_min_order_step$_T
})
export type query_min_order_step$_T = Readable$<number|null>
