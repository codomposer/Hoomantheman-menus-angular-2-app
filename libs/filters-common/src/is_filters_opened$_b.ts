import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { query_is_filters_opened$_b } from '@menus/page'
import type { filters_common_Ctx } from './filters_common_Ctx.js'
const key = 'is_filters_opened$'
export const is_filters_opened$_b:B<filters_common_Ctx, typeof key> = be_(key, (ctx)=>{
	const query_is_filters_opened$ = query_is_filters_opened$_b(ctx)
	const is_filters_opened$ = derived$(query_is_filters_opened$, query_is_filters_opened=>
		query_is_filters_opened
	)
	return is_filters_opened$ as is_filters_opened$_T
})
export type is_filters_opened$_T = Readable$<boolean>
