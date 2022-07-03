import { B, be_ } from '@ctx-core/object'
import { page_data$_b, page_data_T } from './page_data$_b.js'
import type { page_Ctx } from './page_Ctx.js'
const key = 'consume_page_data$'
export const consume_page_data$_b:B<page_Ctx, typeof key> = be_(key, ctx=>{
	const page_data$ = page_data$_b(ctx)
	return consume_page_data as consume_page_data$_T
	function consume_page_data() {
		let page_data = undefined
		page_data$.update(in_page_data=>{
			page_data = in_page_data
			return null
		})
		return page_data
	}
})
export type consume_page_data$_T = ()=>page_data_T
