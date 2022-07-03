import { B, be_} from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { query_search_keywords$_b } from '@menus/page'
import type { filters_common_Ctx } from './filters_common_Ctx.js'
const key = 'search_keyword_a$'
export const search_keyword_a$_b:B<filters_common_Ctx, typeof key> = be_(key, ctx=>{
	const query_search_keywords$ = query_search_keywords$_b(ctx)
	const search_keyword_a$ = derived$(query_search_keywords$, query_search_keywords=>
		query_search_keywords ?? []
	)
	return search_keyword_a$ as search_keyword_a$_T
})
export type search_keyword_a$_T = Readable$<string[]>
