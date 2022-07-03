import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { platform_settings$_b } from '@menus/http'
import type { platform_settings_Ctx } from './platform_settings_Ctx.js'
const key = 'Enable_Delivery$'
export const Enable_Delivery$_b:B<platform_settings_Ctx, typeof key> = be_(key, ctx=>
	derived$(platform_settings$_b(ctx),
		platform_settings=>platform_settings?.Enable_Delivery
	) as Enable_Delivery$_T)
export type Enable_Delivery$_T = Readable$<boolean>
