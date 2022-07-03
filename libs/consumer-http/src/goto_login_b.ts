import { B, be_ } from '@ctx-core/object'
import { query_str_ } from '@ctx-core/uri'
import { goto_b, goto_return_T } from '@menus/ui'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
const key = 'goto_login'
export const goto_login_b:B<consumer_http_Ctx, typeof key> = be_(key, ctx=>{
	const goto = goto_b(ctx)
	return goto_login
	function goto_login(returnUrl?:string) {
		return goto(`/login${query_str_({
			returnUrl: returnUrl || `${window.location.pathname}${window.location.search}`
		})}`)
	}
})
export type goto_login_T = (returnUrl?:string)=>goto_return_T
