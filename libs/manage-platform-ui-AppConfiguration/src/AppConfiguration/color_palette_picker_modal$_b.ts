import { B, be_ } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import { ColorPalettePickerModal_I } from '@menus/color-ui'
import type { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx.js'
const key = 'color_palette_picker_modal$'
export const color_palette_picker_modal$_b:B<manage_platform_ui_AppConfiguration_Ctx, typeof key> = be_(key, ()=>{
	return writable$(undefined) as color_palette_picker_modal$_T
})
export type color_palette_picker_modal$_T = Writable$<ColorPalettePickerModal_I>
