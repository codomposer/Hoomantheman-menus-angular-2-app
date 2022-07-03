import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import type { SearchDishType } from '@menus/search-menu-common'
import { search_dishTypes$_b } from './search_dishTypes$_b.js'
import type { search_menu_Ctx } from './search_menu_Ctx.js'
const key = 'active_search_dishTypes$'
export const active_search_dishTypes$_b:B<search_menu_Ctx, typeof key> = be_(key, ctx=>
	derived$(search_dishTypes$_b(ctx),
		search_dishTypes=>
			(search_dishTypes || []).filter(dishType=>dishType.active)
	) as active_search_dishTypes$_T
)
export type active_search_dishTypes$_T = Readable$<SearchDishType[]>
