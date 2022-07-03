import { B, be_ } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { MenuCartitemModal_I } from './MenuCartitemModal'
import type { restaurant_ui_Ctx } from './restaurant_ui_Ctx.js'
const key = 'restaurant_MenuoptionsModal$'
export const restaurant_MenuoptionsModal$_b:B<restaurant_ui_Ctx, typeof key> = be_(key, ()=>
	writable$<MenuCartitemModal_I>(null) as restaurant_MenuoptionsModal$_T
)
export type restaurant_MenuoptionsModal$_T = Writable$<MenuCartitemModal_I>
