import { B, be_ } from '@ctx-core/object'
import { page_path$_b, Query } from '@ctx-core/sapper'
import { goto_b } from '@menus/ui'
import { assign_to_query_str__b } from './assign_to_query_str__b.js'
import type { page_Ctx } from './page_Ctx.js'
const key = 'assign_to_query_goto'
export const assign_to_query_goto_b:B<page_Ctx, typeof key> = be_(key, (ctx)=>{
	const assign_to_query_str_ = assign_to_query_str__b(ctx)
	const goto = goto_b(ctx)
	const page_path$ = page_path$_b(ctx)
	return assign_to_query_goto as assign_to_query_goto_T
	async function assign_to_query_goto(partial_query:Query):Promise<void> {
		await goto(`${page_path$.$}${assign_to_query_str_(partial_query)}`)
	}
})
export type assign_to_query_goto_T = (partial_query:Query)=>Promise<void>
