import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { manage_platform_settings$_b } from './manage_platform_settings$_b.js'
import type { manage_platform_ui_Ctx } from './manage_platform_ui_Ctx.js'
const key = 'App_ID$'
export const App_ID$_b:B<manage_platform_ui_Ctx, typeof key> = be_(key, function (ctx) {
	const manage_platform_settings$ = manage_platform_settings$_b(ctx)
	return derived$(manage_platform_settings$,
		manage_platform_settings=>
			manage_platform_settings?.App_ID
	) as App_ID$_T
})
export type App_ID$_T = Readable$<string>
