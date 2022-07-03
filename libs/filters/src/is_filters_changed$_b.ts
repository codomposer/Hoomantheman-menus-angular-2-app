import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { filters_changed_count$_b } from './filters_changed_count$_b.js'
import type { filters_Ctx } from './filters_Ctx.js'
const key = 'is_filters_changed$'
export const is_filters_changed$_b:B<filters_Ctx, typeof key> = be_(key, ctx=>
	derived$(filters_changed_count$_b(ctx), filters_changed_count=>
		filters_changed_count > 0) as is_filters_changed$_T
)
export type is_filters_changed$_T = Readable$<boolean>
