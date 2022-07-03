import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { page_params$_b } from '@ctx-core/sapper'
import type { page_Ctx } from './page_Ctx.js'
const key = 'params_orderID$'
export const params_orderID$_b:B<page_Ctx, typeof key> = be_(key, ctx=>{
	const page_params$ = page_params$_b(ctx)
	return derived$(page_params$, page_params=>{
		const in_OrderID = page_params?.orderID
		return (
			in_OrderID == undefined
			? undefined
			: parseInt(in_OrderID.toString())
		)
	}) as params_orderID$_T
})
export type params_orderID$_T = Readable$<number>
