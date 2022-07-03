import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { page_params$_b } from '@ctx-core/sapper'
import type { page_Ctx } from './page_Ctx.js'
const key = 'params_other_fireFlyID$'
export const params_other_fireFlyID$_b:B<page_Ctx, typeof key> = be_(key, ctx=>{
	const page_params$ = page_params$_b(ctx)
	return derived$(page_params$, page_params=>
		page_params?.other_fireFlyID
	) as params_other_fireFlyID$_T
})
export type params_other_fireFlyID$_T = Readable$<string>
