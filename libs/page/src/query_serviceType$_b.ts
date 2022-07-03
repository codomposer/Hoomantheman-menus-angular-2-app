import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { page_query$_b } from '@ctx-core/sapper'
import { ServiceType } from '@menus/service-type-common'
import type { page_Ctx } from './page_Ctx.js'
const key = 'query_serviceType$'
export const query_serviceType$_b:B<page_Ctx, typeof key> = be_(key, ctx=>{
	const page_query$ = page_query$_b(ctx)
	return derived$(page_query$, page_query=>
		page_query?.serviceType
	) as query_serviceType$_T
})
export type query_serviceType$_T = Readable$<ServiceType>
