import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { getCheckboxActiveIcon } from '@menus/util'
import { Color_Balanced$_b } from './Color_Balanced$_b.js'
import type { platform_settings_Ctx } from './platform_settings_Ctx.js'
const key = 'IMG_CHECKBOX_ACTIVE$'
export const IMG_CHECKBOX_ACTIVE$_b:B<platform_settings_Ctx, typeof key> = be_(key, ctx=>
	derived$(Color_Balanced$_b(ctx), Color_Balanced=>
		Color_Balanced && getCheckboxActiveIcon(Color_Balanced)
	) as IMG_CHECKBOX_ACTIVE$_T
)
export type IMG_CHECKBOX_ACTIVE$_T = Readable$<string>
