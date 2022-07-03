import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { active_search_dishTypes$_b } from './active_search_dishTypes$_b.js'
import type { search_menu_Ctx } from './search_menu_Ctx.js'
const key = 'active_search_dishType_Name_a$'
export const active_search_dishType_Name_a$_b:B<search_menu_Ctx, typeof key> = be_(key, ctx=>
	derived$(active_search_dishTypes$_b(ctx),
		active_search_dishTypes=>
			active_search_dishTypes.map(dishType=>dishType.Name)
	) as active_search_dishType_Name_a$_T
)
export type active_search_dishType_Name_a$_T = Readable$<string[]>
