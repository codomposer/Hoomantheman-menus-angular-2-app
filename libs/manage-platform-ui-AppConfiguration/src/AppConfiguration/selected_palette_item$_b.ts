import { B, be_ } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import { colorPalette_T } from '@menus/color'
import type { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx.js'
const key = 'selected_palette_item$'
export const selected_palette_item$_b:B<manage_platform_ui_AppConfiguration_Ctx, typeof key> = be_(key, ()=>{
	return writable$(null) as selected_palette_item$_T
})
export type selected_palette_item$_T = Writable$<colorPalette_T>
