import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { brand_primary } from '@menus/css'
import { platform_settings$_b } from '@menus/http'
import type { platform_settings_Ctx } from './platform_settings_Ctx.js'
const key = 'Color_Positive$'
export const Color_Positive$_b:B<platform_settings_Ctx, typeof key> = be_(key, ctx=>
	derived$(platform_settings$_b(ctx), platform_settings=>
		platform_settings?.Color_Positive || brand_primary
	) as Color_Positive$_T
)
export type Color_Positive$_T = Readable$<string>
