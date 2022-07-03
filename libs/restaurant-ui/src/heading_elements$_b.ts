import { B, be_ } from '@ctx-core/object'
import { Readable$, writable$ } from '@ctx-core/store'
import type { restaurant_ui_Ctx } from './restaurant_ui_Ctx.js'
import { filtered_headings$_b } from './filtered_headings$_b.js'
const key = 'heading_elements$'
export const heading_elements$_b:B<restaurant_ui_Ctx, typeof key> = be_(key, ctx=>{
	const heading_elements$ = writable$<HTMLDivElement[]>([])
	const filtered_headings$ = filtered_headings$_b(ctx)
	filtered_headings$.subscribe($filtered_headings=>{
		if (!$filtered_headings) {
			heading_elements$.set(null)
			return
		}
		const heading_elements = heading_elements$.$
		if (heading_elements.length > $filtered_headings.length) {
			heading_elements$.set(
				heading_elements.slice($filtered_headings.length)
			)
		}
	})
	return heading_elements$ as heading_elements$_T
})
export type heading_elements$_T = Readable$<HTMLDivElement[]>
