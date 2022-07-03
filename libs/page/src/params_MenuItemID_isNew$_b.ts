import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { params_MenuItemID$_b } from './params_MenuItemID$_b.js'
import type { page_Ctx } from './page_Ctx.js'
const key = 'params_MenuItemID_isNew$'
export const params_MenuItemID_isNew$_b:B<page_Ctx, typeof key> = be_(key, ctx=>{
	const params_menuitemID$ = params_MenuItemID$_b(ctx)
	return derived$(params_menuitemID$, params_menuitemID=>
		params_menuitemID <= 0
	) as params_MenuItemID_isNew$_T
})
export type params_MenuItemID_isNew$_T = Readable$<boolean>
