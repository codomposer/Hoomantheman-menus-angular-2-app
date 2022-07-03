import { B, be_ } from '@ctx-core/object'
import { hidden_route_a_b } from './hidden_route_a_b.js'
import { hidden_route_regex_a_b } from './hidden_route_regex_a_b.js'
import type { breadcrumb_Ctx } from './breadcrumb_Ctx.js'
const key = 'is_route_hidden'
export const is_route_hidden_b:B<breadcrumb_Ctx, typeof key> = be_(key, ctx=>{
	const hidden_route_a = hidden_route_a_b(ctx)
	const hidden_route_regex_a = hidden_route_regex_a_b(ctx)
	return is_route_hidden as is_route_hidden_T
	function is_route_hidden(route:string):boolean {
		if (~hidden_route_a.indexOf(route)) return true
		hidden_route_regex_a.forEach((value:any)=>{
			if (new RegExp(value).exec(route)) {
				return true
			}
		})
	}
})
export type is_route_hidden_T = (route:string)=>boolean
