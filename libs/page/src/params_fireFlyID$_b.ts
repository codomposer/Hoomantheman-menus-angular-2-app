import { event_log$_b } from '@ctx-core/event-log'
import { B, be_ } from '@ctx-core/object'
import { page_params$_b } from '@ctx-core/sapper'
import { derived$, Readable$ } from '@ctx-core/store'
import type { page_Ctx } from './page_Ctx.js'
const key = 'params_fireFlyID$'
export const params_fireFlyID$_b:B<page_Ctx, typeof key> = be_(key, ctx=>{
	const event_log$ = event_log$_b(ctx)
	const page_params$ = page_params$_b(ctx)
	const params_fireFlyID$ = derived$(page_params$,
		page_params=>{
			return page_params?.fireFlyID
		}
	) as params_fireFlyID$_T
	params_fireFlyID$.subscribe(params_fireFlyID=>{
		event_log$.add({ params_fireFlyID })
	})
	return params_fireFlyID$
})
export type params_fireFlyID$_T = Readable$<string>
