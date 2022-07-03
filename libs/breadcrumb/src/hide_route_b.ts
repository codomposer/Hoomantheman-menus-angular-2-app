import { B, be_ } from '@ctx-core/object'
import { hidden_route_a_b } from './hidden_route_a_b.js'
import type { breadcrumb_Ctx } from './breadcrumb_Ctx.js'
const key = 'hide_route'
export const hide_route_b:B<breadcrumb_Ctx, typeof key> = be_(key, ctx=>{
		const hidden_route_a = hidden_route_a_b(ctx)
		return hide_route as hide_route_T
		function hide_route(route:string):void {
			if (hidden_route_a.indexOf(route) === -1) {
				hidden_route_a.push(route)
			}
		}
	}
)
export type hide_route_T = (route:string)=>void
