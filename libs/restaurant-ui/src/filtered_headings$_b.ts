import { tup } from '@ctx-core/array'
import { B, be_, clone } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import type { Heading_I } from '@menus/consumer-menu'
import type { SearchMenuitem_I } from '@menus/search-menu-common'
import { restaurant_search_text$_b } from './restaurant_search_text$_b.js'
import type { restaurant_ui_Ctx } from './restaurant_ui_Ctx.js'
import { selected_masterheading$_b } from './selected_masterheading$_b.js'
const key = 'filtered_headings$'
export const filtered_headings$_b:B<restaurant_ui_Ctx, typeof key> = be_(key, ctx=>{
	const restaurant_search_text$ = restaurant_search_text$_b(ctx)
	const selected_masterheading$ = selected_masterheading$_b(ctx)
	return derived$(tup(selected_masterheading$, restaurant_search_text$),//region
		([selected_masterheading, restaurant_search_text])=>{
			const headings:Heading_I[] = (selected_masterheading?.heads || [])
			if (!restaurant_search_text) {
				return headings
			}
			const filtered_headings:Heading_I[] = []
			for (const heading of headings) {
				const menuitems:SearchMenuitem_I[] = []
				const new_heading = clone(heading, { menuitems }) as Heading_I
				for (const menuitem of heading.menuitems) {
					if (~menuitem.MenuItemName.toLowerCase().indexOf(restaurant_search_text.toLowerCase())) {
						menuitems.push(menuitem)
					}
				}
				if (menuitems.length) {
					filtered_headings.push(new_heading)
				}
			}
			return filtered_headings
		}
	) as filtered_headings$_T
})
export type filtered_headings$_T = Readable$<Heading_I[]>
