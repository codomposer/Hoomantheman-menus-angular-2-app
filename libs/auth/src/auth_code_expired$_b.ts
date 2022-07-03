import { B, be_, clone } from '@ctx-core/object'
import { page_path$_b, page_query$_b, page_query$_T, Query } from '@ctx-core/sapper'
import { writable$, Writable$ } from '@ctx-core/store'
import { query_str_ } from '@ctx-core/uri'
import { goto_b, goto_T } from '@menus/ui'
import type { auth_Ctx } from './auth_Ctx.js'
const key = 'auth_code_expired$'
export const auth_code_expired$_b:B<auth_Ctx, typeof key> = be_(key, ctx=>{
	const auth_code_expired$:auth_code_expired$_T = writable$<auth_code_expired_T>(undefined)
	const page_path$ = page_path$_b(ctx)
	const page_query$:page_query$_T = page_query$_b(ctx)
	const goto:goto_T = goto_b(ctx)
	auth_code_expired$.subscribe(async (auth_code_expired:auth_code_expired_T)=>{
		const page_path = page_path$.$
		if (auth_code_expired?.type === 'CR' && page_path !== '/login') {
			console.info(key, auth_code_expired)
			const page_query:Query = page_query$.$
			const clean_page_query:Query = clone(page_query)
			delete clean_page_query.returnUrl
			await goto(
				`/login${
					query_str_({
						session: 'expired',
						returnUrl: `${page_path || '/'}${query_str_(clean_page_query)}`
					})}`
			)
		}
	})
	return auth_code_expired$ as auth_code_expired$_T
})
export interface auth_code_expired_T {
	type:'CR'|'RO',
	json?:any,
}
export type auth_code_expired$_T = Writable$<auth_code_expired_T|undefined>
