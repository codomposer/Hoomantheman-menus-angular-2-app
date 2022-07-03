import { B, be_ } from '@ctx-core/object'
import { page_query$_b } from '@ctx-core/sapper'
import { derived$, Readable$ } from '@ctx-core/store'
import type { page_Ctx } from './page_Ctx.js'
const key = 'query_delivery_fee_step$'
export const query_delivery_fee_step$_b:B<page_Ctx, typeof key> = be_(key, (ctx)=>{
	const page_query$ = page_query$_b(ctx)
	const query_delivery_fee_step$ = derived$(page_query$, page_query=>{
		const delivery_fee_step = page_query?.delivery_fee_step as string
		return delivery_fee_step ? parseInt(delivery_fee_step) : null
	})
	return query_delivery_fee_step$
})
export type query_delivery_fee_step$_T = Readable$<number|null>
