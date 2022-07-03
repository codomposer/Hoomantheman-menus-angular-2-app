import { B, be_ } from '@ctx-core/object'
import { tup } from '@ctx-core/array'
import { derived$, Readable$ } from '@ctx-core/store'
import { ro_menuoptionsizes$_b } from './ro_menuoptionsizes$_b.js'
import { ro_menuitem_is_multisize_errors_ } from './ro_menuitem_is_multisize_errors_.js'
import { ro_menuitem_is_multisize$_b } from './ro_menuitem_is_multisize$_b.js'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
const key = 'ro_menuitem_is_multisize_errors$'
export const ro_menuitem_is_multisize_errors$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ctx=>{
	const ro_menuitem_is_multisize$ = ro_menuitem_is_multisize$_b(ctx)
	const ro_menuoptionsizes$ = ro_menuoptionsizes$_b(ctx)
	return derived$(tup(ro_menuitem_is_multisize$, ro_menuoptionsizes$),
		([ro_menuitem_is_multisize, ro_menuoptionsizes])=>{
			return ro_menuitem_is_multisize_errors_(ro_menuitem_is_multisize, ro_menuoptionsizes)
		}
	) as ro_menuitem_is_multisize_errors$_T
})
export type ro_menuitem_is_multisize_errors$_T = Readable$<string[]>
