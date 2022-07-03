import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { brand_success } from '@menus/css'
import { platform_settings$_b } from '@menus/http'
import type { platform_settings_Ctx } from './platform_settings_Ctx.js'
const key = 'Color_Balanced$'
export const Color_Balanced$_b:B<platform_settings_Ctx, typeof key> = be_(key, ctx=>
	derived$(platform_settings$_b(ctx), platform_settings=>
		platform_settings?.Color_Balanced || brand_success
	) as Color_Balanced$_T
)
export type Color_Balanced$_T = Readable$<string>
