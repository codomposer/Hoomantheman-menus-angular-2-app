import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { font_awesome_Ctx } from './font_awesome_Ctx.js'
const key = 'fontawesome_loaded$'
export const fontawesome_loaded$_b:B<font_awesome_Ctx, typeof key> = be_(key, ()=>
	writable$<boolean>(false) as fontawesome_loaded$_T
)
export type fontawesome_loaded$_T = Writable$<boolean>
