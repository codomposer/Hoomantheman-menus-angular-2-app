import { B, be_ } from '@ctx-core/object'
import { tup } from '@ctx-core/array'
import { derived$, Readable$ } from '@ctx-core/store'
import { params_MenuItemID_isNew$_b } from '@menus/page'
import { ro_menuitem_is_new_singlesize$_b } from './ro_menuitem_is_new_singlesize$_b.js'
import { ro_menuitem_is_new_multisize$_b } from './ro_menuitem_is_new_multisize$_b.js'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
const key = 'ro_menuitem_is_new_size_errors$'
export const ro_menuitem_is_new_size_errors$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ctx=>{
	const params_MenuItemID_isNew$ = params_MenuItemID_isNew$_b(ctx)
	const ro_Menuitem_is_new_singlesize$ = ro_menuitem_is_new_singlesize$_b(ctx)
	const ro_menuitem_is_new_multisize$ = ro_menuitem_is_new_multisize$_b(ctx)
	return derived$(tup(params_MenuItemID_isNew$, ro_Menuitem_is_new_singlesize$, ro_menuitem_is_new_multisize$),
		([
			 params_Menuitem_isNew,
			 ro_Menuitem_is_new_singlesize,
			 ro_menuitem_is_new_multisize,
		 ])=>{
			return (
				(params_Menuitem_isNew && !ro_Menuitem_is_new_singlesize && !ro_menuitem_is_new_multisize)
				? ['Size option is required']
				: []
			)
		}
	) as ro_menuitem_is_new_size_errors$_T
})
export type ro_menuitem_is_new_size_errors$_T = Readable$<string[]>
