import { B, be_ } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { restaurant_ui_Ctx } from './restaurant_ui_Ctx.js'
const key = 'restaurant_search_text$'
export const restaurant_search_text$_b:B<restaurant_ui_Ctx, typeof key> = be_(key, ()=>{
	return writable$<string>('') as restaurant_search_text$_T
})
export type restaurant_search_text$_T = Writable$<string>
