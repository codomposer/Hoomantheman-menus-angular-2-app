import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { page_Ctx } from './page_Ctx.js'
const key = 'page_data$'
export const page_data$_b:B<page_Ctx, typeof key> = be_(key, ()=>
	writable$<any>(null) as page_data$_T
)
export type page_data_T = any
export type page_data$_T = Writable$<page_data_T>
