import { B, be_ } from '@ctx-core/object'
import { Path } from '@menus/route'
import type { breadcrumb_Ctx } from './breadcrumb_Ctx.js'
const key = 'hidden_route_regex_a'
export const hidden_route_regex_a_b:B<breadcrumb_Ctx, typeof key> = be_(key, ()=>{
	const hidden_route_regex_a = [
		`^/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}/[A-Z0-9]+/${Path.RO.MENU_DETAILS}$`,
		`^/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}/[A-Z0-9]+/${Path.RO.ORDER_DETAILS}$`,
		`^/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}/[A-Z0-9]+/${Path.RO.PREVIEW}$`,
		`^/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}/[A-Z0-9]+/${Path.RO.MENU_DETAILS}/[0-9]+/${Path.RO.CATEGORY_DETAILS}$`,
		`^/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}/[A-Z0-9]+/${Path.RO.MENU_DETAILS}/[0-9]+/${Path.RO.CATEGORY_DETAILS}/[0-9]+/${Path.RO.MENU_ITEM_DETAILS}$`,
	]
	return hidden_route_regex_a as hidden_route_regex_a_T
})
export type hidden_route_regex_a_T = string[]
