import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { ro_restaurant_ui_ChartsTab_Ctx } from '../ro_restaurant_ui_ChartsTab_Ctx.js'
const key = 'charts_proximity$'
export const charts_proximity$_b:B<ro_restaurant_ui_ChartsTab_Ctx, typeof key> = be_(key, ()=>
	writable$<number>(3) as charts_proximity$_T
)
export type charts_proximity$_T = Writable$<number>
