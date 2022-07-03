import { B, be_ } from '@ctx-core/object'
import { query_str_ } from '@ctx-core/uri'
import { goto_b, goto_return_T } from '@menus/ui'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
const key = 'goto_ro_login'
export const goto_ro_login_b:B<ro_http_Ctx, typeof key> = be_(key, ctx=>{
	const goto = goto_b(ctx)
	return goto_ro_login as goto_ro_login_T
	function goto_ro_login(returnUrl?:string) {
		return goto(`/backoffice/login${query_str_({
			returnUrl: returnUrl || window.location.href
		})}`)
	}
})
export type goto_ro_login_T = (returnUrl?:string)=>goto_return_T
