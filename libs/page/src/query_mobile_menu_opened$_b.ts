import { B, be_ } from '@ctx-core/object'
import { page_query$_b } from '@ctx-core/sapper'
import { derived$, Readable$ } from '@ctx-core/store'
import type { page_Ctx } from './page_Ctx.js'
const key = 'query_mobile_menu_opened$'
export const query_mobile_menu_opened$_b:B<page_Ctx, typeof key> = be_(key, (ctx)=>{
	const page_query$ = page_query$_b(ctx)
	const query_mobile_menu_opened$ = derived$(page_query$, page_query=>{
		const query_mobile_menu_opened = page_query?.mobile_menu_opened as string
		return query_mobile_menu_opened ? !!parseInt(query_mobile_menu_opened) : null
	})
	return query_mobile_menu_opened$ as query_mobile_menu_opened$_T
})
export type query_mobile_menu_opened$_T = Readable$<boolean|null>
