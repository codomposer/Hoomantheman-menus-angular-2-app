import { B, be_ } from '@ctx-core/object'
import { page_path$_b } from '@ctx-core/sapper'
import { writable$, Writable$ } from '@ctx-core/store'
import { query_str_ } from '@ctx-core/uri'
import { goto_b, goto_T } from '@menus/ui'
import type { auth_Ctx } from './auth_Ctx.js'
const key = 'ro_auth_code_expired$'
export const ro_auth_code_expired$_b:B<auth_Ctx, typeof key> = be_(key, ctx=>{
	const page_path$ = page_path$_b(ctx)
	const goto:goto_T = goto_b(ctx)
	const ro_auth_code_expired$:ro_auth_code_expired$_T = writable$<ro_auth_code_expired_T>(null)
	ro_auth_code_expired$.subscribe(async ($ro_auth_code_expired)=>{
		const page_path = page_path$.$
		if ($ro_auth_code_expired?.type === 'RO' && page_path !== '/backoffice/login') {
			await goto(`/backoffice/login${
				query_str_({ session: 'expired' })
			}`)
		}
	})
	return ro_auth_code_expired$ as ro_auth_code_expired$_T
})
export interface ro_auth_code_expired_T {
	type:string
	json?:any
}
export interface ro_auth_code_expired$_T extends Writable$<ro_auth_code_expired_T> {}
