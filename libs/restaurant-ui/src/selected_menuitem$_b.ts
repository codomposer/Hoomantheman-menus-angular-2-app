import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { SearchMenuitem_I } from '@menus/search-menu-common'
import { restaurant_hours_cache_ctx$_b } from '@menus/restaurant-hours'
import { selected_masterheading$_b } from './selected_masterheading$_b.js'
import type { restaurant_ui_Ctx } from './restaurant_ui_Ctx.js'
const key = 'selected_menuitem$'
export const selected_menuitem$_b:B<restaurant_ui_Ctx, typeof key> = be_(key, ctx=>{
	const selected_masterheading$ = selected_masterheading$_b(ctx)
	const restaurant_hours_cache_ctx = restaurant_hours_cache_ctx$_b(ctx)
	const selected_menuitem = writable$<SearchMenuitem_I>(null)
	selected_menuitem.subscribe(async (selected_menuitem)=>{
		if (!selected_menuitem) return
		await restaurant_hours_cache_ctx.ensure(selected_menuitem.FFID)
	})
	selected_masterheading$.subscribe(selected_masterheading=>{
		if (!selected_masterheading) {
			selected_menuitem.set(null)
			return
		}
		const menuitem = selected_masterheading.heads?.[0]?.menuitems?.[0]
		if (menuitem) {
			selected_menuitem.set(menuitem)
		}
	})
	return selected_menuitem as selected_menuitem$_T
})
export type selected_menuitem$_T = Writable$<SearchMenuitem_I>
