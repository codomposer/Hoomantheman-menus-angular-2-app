import type { SvelteComponent } from 'svelte'
import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { modal_Ctx } from './modal_Ctx.js'
const key = 'active_modal$'
export const active_modal$_b:B<modal_Ctx, typeof key> = be_(key, ()=>
	writable$(null) as active_modal$_T
)
export type active_modal$_T = Writable$<SvelteComponent>
