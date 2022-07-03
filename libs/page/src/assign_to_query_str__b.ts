import { B, be_, clone } from '@ctx-core/object'
import { page_query$_b, Query } from '@ctx-core/sapper'
import { query_str_ } from '@ctx-core/uri'
import type { page_Ctx } from './page_Ctx.js'
const key = 'assign_to_query_str_'
export const assign_to_query_str__b:B<page_Ctx, typeof key> = be_(key, (ctx) => {
	const page_query$ = page_query$_b(ctx)
	return assign_to_query_str_ as assign_to_query_str__T
	function assign_to_query_str_(partial_query:Query):string {
		return query_str_(clone(page_query$.$, partial_query))
	}
})
export type assign_to_query_str__T = (partial_query:Query)=>string
