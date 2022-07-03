import { B, be_ } from '@ctx-core/object'
import type { Goto } from '@ctx-core/sapper'
import { writable$, Writable$ } from '@ctx-core/store'
import type { ui_Ctx } from './ui_Ctx.js'
const key = 'dom_goto$'
export const dom_goto$_b:B<ui_Ctx, typeof key> = be_(key, ()=>
	writable$(undefined) as dom_goto$_T
)
export type dom_goto$_T = Writable$<Goto|undefined>
