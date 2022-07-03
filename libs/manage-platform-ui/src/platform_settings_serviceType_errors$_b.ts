import { B, be_ } from '@ctx-core/object'
import { isNumber } from '@ctx-core/number'
import { derived$, Readable$ } from '@ctx-core/store'
import { manage_platform_settings$_b } from './manage_platform_settings$_b.js'
import type { manage_platform_ui_Ctx } from './manage_platform_ui_Ctx.js'
const key = 'platform_settings_serviceType_errors$'
export const platform_settings_serviceType_errors$_b:B<manage_platform_ui_Ctx, typeof key> = be_(key, function (ctx) {
	const manage_platform_settings$ = manage_platform_settings$_b(ctx)
	return derived$(manage_platform_settings$,//region
		manage_platform_settings=>{
			const platform_settings_serviceType_errors = []
			if (!manage_platform_settings) return platform_settings_serviceType_errors
			if (
				!manage_platform_settings.Enable_Delivery
				&& !manage_platform_settings.Enable_Pickup
				&& !manage_platform_settings.Enable_Catering
				&& !manage_platform_settings.Enable_DiningIn
			) {
				platform_settings_serviceType_errors.push('At least 1 Service Type is required')
			}
			if (!isNumber(manage_platform_settings.Default_ServiceType)) {
				platform_settings_serviceType_errors.push('Default Service Type must be selected')
			}
			return platform_settings_serviceType_errors
		}
	) as platform_settings_serviceType_errors$_T
})
export type platform_settings_serviceType_errors$_T = Readable$<string[]>
