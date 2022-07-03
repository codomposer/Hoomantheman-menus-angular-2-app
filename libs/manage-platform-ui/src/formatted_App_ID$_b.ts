import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import type { manage_platform_ui_Ctx } from './manage_platform_ui_Ctx.js'
import { APP_ID_PREFIX } from './APP_ID_PREFIX.js'
import { sub_App_ID$_b } from './sub_App_ID$_b.js'
const key = 'formatted_App_ID$'
export const formatted_App_ID$_b:B<manage_platform_ui_Ctx, typeof key> = be_(key, function (ctx) {
	const sub_App_ID$ = sub_App_ID$_b(ctx)
	return derived$(sub_App_ID$,
		sub_App_ID=>{
			return sub_App_ID ? `${APP_ID_PREFIX}${sub_App_ID}` : ''
		}
	) as formatted_App_ID$_T
})
export type formatted_App_ID$_T = Readable$<string>
