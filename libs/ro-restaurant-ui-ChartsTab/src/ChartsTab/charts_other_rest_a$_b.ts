import { B, be_ } from '@ctx-core/object'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import type { ro_restaurant_ui_ChartsTab_Ctx } from '../ro_restaurant_ui_ChartsTab_Ctx.js'
import type { OtherRest } from './OtherRest'
const key = 'charts_other_rest_a$'
export const charts_other_rest_a$_b:B<ro_restaurant_ui_ChartsTab_Ctx, typeof key> = be_(key, ()=>
	refresh_writable_<OtherRest[]>([]) as charts_other_rest_a$_T
)
export type charts_other_rest_a$_T = refresh_writable_T<OtherRest[]>
