import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import { getRadioIcon } from '@menus/util'
import type { platform_settings_Ctx } from './platform_settings_Ctx.js'
const key = 'IMG_RADIO$'
export const IMG_RADIO$_b:B<platform_settings_Ctx, typeof key> = be_(key, ()=>
	writable$(getRadioIcon()) as IMG_RADIO$_T
)
export type IMG_RADIO$_T = Writable$<string>
