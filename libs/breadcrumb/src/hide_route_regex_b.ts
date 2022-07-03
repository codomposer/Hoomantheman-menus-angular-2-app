import { B, be_ } from '@ctx-core/object'
import { hidden_route_regex_a_b } from './hidden_route_regex_a_b.js'
import type { breadcrumb_Ctx } from './breadcrumb_Ctx.js'
const key = 'hide_route_regex'
export const hide_route_regex_b:B<breadcrumb_Ctx, typeof key> = be_(key, ctx=>{
	const hidden_route_regex_a = hidden_route_regex_a_b(ctx)
	return hide_route_regex as hide_route_regex_T
	function hide_route_regex(route:string):void {
		if (hidden_route_regex_a.indexOf(route) === -1) {
			hidden_route_regex_a.push(route)
		}
	}
})
export type hide_route_regex_T = (route:string)=>void
