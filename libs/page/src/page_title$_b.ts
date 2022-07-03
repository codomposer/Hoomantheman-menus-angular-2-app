import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { page_Ctx } from './page_Ctx.js'
const key = 'page_title$'
export const page_title$_b:B<page_Ctx, typeof key> = be_(key, ()=>
	writable$<string>('') as page_title$_T
)
export type page_title$_T = Writable$<string>
