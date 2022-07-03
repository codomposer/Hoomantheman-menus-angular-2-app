import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { platform_settings$_b } from '@menus/http'
import type { platform_settings_Ctx } from './platform_settings_Ctx.js'
const key = 'App_IOS_Store_Link$'
export const App_IOS_Store_Link$_b:B<platform_settings_Ctx, typeof key> = be_(key, ctx=>
	derived$(platform_settings$_b(ctx), platform_settings=>
		platform_settings?.App_IOS_Store_Link
	) as App_IOS_Store_Link$_T
)
export type App_IOS_Store_Link$_T = Readable$<string>
