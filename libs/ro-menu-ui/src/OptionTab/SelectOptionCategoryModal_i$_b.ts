import { B, be_ } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { SelectOptionCategoryModal_I } from '../SelectOptionCategoryModal/index.js'
const key = 'SelectOptionCategoryModal_i$'
export const SelectOptionCategoryModal_i$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ()=>{
	return writable$(null) as SelectOptionCategoryModal_i$_T
})
export type SelectOptionCategoryModal_i$_T = Writable$<SelectOptionCategoryModal_I>
