import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import type { SearchMenuitem_I } from '@menus/search-menu-common'
import type { consumer_search_ui_Ctx } from './consumer_search_ui_Ctx.js'
import { search_menus_menu_payload$_b } from './search_menus_menu_payload$_b.js'
const key = 'search_menuitem_a$'
export const search_menuitem_a$_b:B<consumer_search_ui_Ctx, typeof key> = be_(key, ctx=>{
	const search_menus_menu_payload$ = search_menus_menu_payload$_b(ctx)
	return derived$(search_menus_menu_payload$, search_menus_menu_payload=>{
		return search_menus_menu_payload?.Data
	}) as search_menuitem_a$_T
})
export type search_menuitem_a$_T = Readable$<SearchMenuitem_I[]>
