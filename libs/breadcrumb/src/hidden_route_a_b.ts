import { B, be_ } from '@ctx-core/object'
import { Path } from '@menus/route'
import type { breadcrumb_Ctx } from './breadcrumb_Ctx.js'
const key = 'hidden_route_a'
export const hidden_route_a_b:B<breadcrumb_Ctx, typeof key> = be_(key, ()=>{
	const hidden_route_a = [
		`/${Path.RO.BASE}`,
	]
	return hidden_route_a as hidden_route_a_T
})
export type hidden_route_a_T = string[]
