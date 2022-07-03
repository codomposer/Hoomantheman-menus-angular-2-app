import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { event_log$_b } from '@ctx-core/event-log'
import { page_params$_b } from '@ctx-core/sapper'
import type { page_Ctx } from './page_Ctx.js'
const key = 'params_name$'
export const params_name$_b:B<page_Ctx, typeof key> = be_(key, ctx=>{
	const page_params$ = page_params$_b(ctx)
	const event_log$ = event_log$_b(ctx)
	const params_name$ = derived$(page_params$, $params=>
		$params?.name
	) as params_name$_T
	params_name$.subscribe(params_name=>{
		event_log$.add({ params_name })
	})
	return params_name$
})
export type params_name$_T = Readable$<string>
