import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { App_ID$_b } from './App_ID$_b.js'
import { APP_ID_PREFIX_REGEX } from './APP_ID_PREFIX_REGEX.js'
import type { manage_platform_ui_Ctx } from './manage_platform_ui_Ctx.js'
const key = 'sub_App_ID$'
export const sub_App_ID$_b:B<manage_platform_ui_Ctx, typeof key> = be_(key, function (ctx) {
	const App_ID$ = App_ID$_b(ctx)
	return derived$(App_ID$,//region
		(App_ID)=>{
			return (
				App_ID
				? App_ID.replace(new RegExp(APP_ID_PREFIX_REGEX, 'g'), '')
				: ''
			)
		}
	) as sub_App_ID$_T
})
export type sub_App_ID$_T = Readable$<string>
