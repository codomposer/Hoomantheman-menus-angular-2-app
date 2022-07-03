import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { platform_settings$_b } from '@menus/http'
import type { platform_settings_Ctx } from './platform_settings_Ctx.js'
const key = 'Enable_Cuisine_Filter$'
export const Enable_Cuisine_Filter$_b:B<platform_settings_Ctx, typeof key> = be_(key, ctx=>
	derived$(platform_settings$_b(ctx),
		platform_settings=>platform_settings?.Enable_Cuisine_Filter
	) as Enable_Cuisine_Filter$_T
)
export type Enable_Cuisine_Filter$_T = Readable$<boolean>
