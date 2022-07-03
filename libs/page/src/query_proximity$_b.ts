import { B, be_ } from '@ctx-core/object'
import { page_query$_b } from '@ctx-core/sapper'
import { derived$, Readable$ } from '@ctx-core/store'
import type { page_Ctx } from './page_Ctx.js'
const key = 'query_proximity$'
export const query_proximity$_b:B<page_Ctx, typeof key> = be_(key, ctx=>{
	const page_query$ = page_query$_b(ctx)
	return derived$(page_query$, page_query=>{
		const proximity = page_query?.proximity as string
		return proximity ? parseFloat(proximity) : null
	}) as query_proximity$_T
})
export type query_proximity$_T = Readable$<number|null>
