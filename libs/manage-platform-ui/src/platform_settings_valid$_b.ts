import { flatten } from '@ctx-core/array'
import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { platform_settings_errors$_b } from './platform_settings_errors$_b.js'
import type { manage_platform_ui_Ctx } from './manage_platform_ui_Ctx.js'
const key = 'platform_settings_valid$'
export const platform_settings_valid$_b:B<manage_platform_ui_Ctx, typeof key> = be_(key, ctx=>{
	const platform_settings_errors$ = platform_settings_errors$_b(ctx)
	return derived$(platform_settings_errors$,//region
		(platform_settings_errors)=>
			!flatten(platform_settings_errors || []).length
	) as platform_settings_valid$_T
})
export type platform_settings_valid$_T = Readable$<boolean>
