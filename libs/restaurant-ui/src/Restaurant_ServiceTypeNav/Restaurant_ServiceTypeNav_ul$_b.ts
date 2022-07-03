import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { restaurant_ui_Ctx } from '../restaurant_ui_Ctx.js'
const key = 'Restaurant_ServiceTypeNav_ul$'
export const Restaurant_ServiceTypeNav_ul$_b:B<restaurant_ui_Ctx, typeof key> = be_(key, ()=>
	writable$(null) as Restaurant_ServiceTypeNav_ul$_T
)
export type Restaurant_ServiceTypeNav_ul$_T = Writable$<HTMLUListElement>
