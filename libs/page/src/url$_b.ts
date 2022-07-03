import { B, be_ } from '@ctx-core/object'
import { tup } from '@ctx-core/array'
import { query_str_ } from '@ctx-core/uri'
import { derived$, Readable$ } from '@ctx-core/store'
import { page_path$_b, page_query$_b } from '@ctx-core/sapper'
import type { page_Ctx } from './page_Ctx.js'
const key = 'url$'
export const url$_b:B<page_Ctx, typeof key> = be_(key, ctx=>
	derived$(
		tup(page_path$_b(ctx), page_query$_b(ctx)), (
			[page_path, page_query]
		)=>`${page_path}${query_str_(page_query)}`
	) as url$_T
)
export type url$_T = Readable$<string>
