import { B, be_ } from '@ctx-core/object'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
const key = 'menuoptionsize_edit_a$'
export const menuoptionsize_edit_a$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ()=>{
	return refresh_writable_<boolean[]>([])
})
export type menuoptionsize_edit_a$_T = refresh_writable_T<boolean[]>
