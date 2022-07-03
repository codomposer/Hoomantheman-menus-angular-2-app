import { B, be_} from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { query_search_view$_b } from '@menus/page'
import type { SEARCH_VIEW_T } from '@menus/web-config'
import type { filters_common_Ctx } from './filters_common_Ctx.js'
const key = 'search_view$'
export const search_view$_b:B<filters_common_Ctx, typeof key> = be_(key, ctx=>{
	const query_search_view$ = query_search_view$_b(ctx)
	const search_view$ = derived$(query_search_view$, query_search_view=>
		query_search_view
	)
	return search_view$ as search_view$_T
})
export type search_view$_T = Readable$<SEARCH_VIEW_T|null>
