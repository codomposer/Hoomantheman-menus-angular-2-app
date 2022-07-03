import { tup } from '@ctx-core/array'
import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { params_MenuItemID_isNew$_b } from '@menus/page'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
import { ro_menuitem$_b } from './ro_menuitem$_b.js'
import { ro_menuitem_is_multisize_ } from './ro_menuitem_is_multisize_.js'
import { ro_menuitem_is_new_multisize$_b } from './ro_menuitem_is_new_multisize$_b.js'
const key = 'ro_menuitem_is_multisize$'
export const ro_menuitem_is_multisize$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ctx=>{
	const params_Menuitem_isNew$ = params_MenuItemID_isNew$_b(ctx)
	const ro_menuitem$ = ro_menuitem$_b(ctx)
	const ro_menuitem_is_new_multisize$ = ro_menuitem_is_new_multisize$_b(ctx)
	return derived$(tup(ro_menuitem$, params_Menuitem_isNew$, ro_menuitem_is_new_multisize$),
		([ro_menuitem, params_Menuitem_isNew, ro_menuitem_is_new_multisize])=>{
			return (
				params_Menuitem_isNew
				? ro_menuitem_is_new_multisize
				: ro_menuitem_is_multisize_(ro_menuitem)
			)
		}
	) as ro_menuitem_is_multisize$_T
})
export type ro_menuitem_is_multisize$_T = Readable$<boolean>
