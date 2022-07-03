import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import { getCheckboxIcon } from '@menus/util'
import type { platform_settings_Ctx } from './platform_settings_Ctx.js'
const key = 'IMG_CHECKBOX$'
export const IMG_CHECKBOX$_b:B<platform_settings_Ctx, typeof key> = be_(key, ()=>
	writable$(getCheckboxIcon()) as IMG_CHECKBOX$_T
)
export type IMG_CHECKBOX$_T = Writable$<string>
