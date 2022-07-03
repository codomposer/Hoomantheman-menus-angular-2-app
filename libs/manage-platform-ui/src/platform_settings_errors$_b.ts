import { B, be_ } from '@ctx-core/object'
import { tup } from '@ctx-core/array'
import { derived$, Readable$ } from '@ctx-core/store'
import { platform_settings_serviceType_errors$_b } from './platform_settings_serviceType_errors$_b.js'
import { platform_settings_form_errors$_b } from './platform_settings_form_errors$_b.js'
import type { manage_platform_ui_Ctx } from './manage_platform_ui_Ctx.js'
const key = 'platform_settings_errors$'
export const platform_settings_errors$_b:B<manage_platform_ui_Ctx, typeof key> = be_(key, function (ctx) {
	const platform_settings_form_errors$ = platform_settings_form_errors$_b(ctx)
	const platform_settings_serviceType_errors$ = platform_settings_serviceType_errors$_b(ctx)
	return derived$(tup(platform_settings_form_errors$, platform_settings_serviceType_errors$,),
		([platform_settings_form_errors, platform_settings_serviceType_errors])=>{
			return [...platform_settings_form_errors, ...platform_settings_serviceType_errors]
		}
	)
})
export type platform_settings_errors$_T = Readable$<string[]>
