import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { event_log$_b } from '@ctx-core/event-log'
import { page_params$_b } from '@ctx-core/sapper'
import type { page_Ctx } from './page_Ctx.js'
const key = 'params_cuisine$'
export const params_cuisine$_b:B<page_Ctx, typeof key> = be_(key, ctx=>{
	const page_params$ = page_params$_b(ctx)
	const event_log$ = event_log$_b(ctx)
	const params_cuisine$ = derived$(page_params$, page_params=>
		page_params?.cuisine
	) as params_cuisine$_T
	params_cuisine$.subscribe(params_cuisine=>{
		event_log$.add({ params_cuisine })
	})
	return params_cuisine$
})
export type params_cuisine$_T = Readable$<string>
