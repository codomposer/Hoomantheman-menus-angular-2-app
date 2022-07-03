import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { active_search_dishTypes$_b } from './active_search_dishTypes$_b.js'
import type { search_menu_Ctx } from './search_menu_Ctx.js'
const key = 'search_menus_menuitems_termsinclude$'
export const search_menus_menuitems_termsinclude$_b:B<search_menu_Ctx, typeof key> = be_(key, ctx=>
	derived$(active_search_dishTypes$_b(ctx),
		(active_search_dishTypes)=>
			active_search_dishTypes?.map(search_dishType=>search_dishType.Name)?.join('|') || ''
	) as search_menus_menuitems_termsinclude$_T
)
export type search_menus_menuitems_termsinclude$_T = Readable$<string>
