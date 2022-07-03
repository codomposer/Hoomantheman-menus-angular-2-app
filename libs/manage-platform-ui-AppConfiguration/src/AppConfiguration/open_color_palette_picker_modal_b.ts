import { B, be_ } from '@ctx-core/object'
import type { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx.js'
import { color_palette_picker_modal$_b } from './color_palette_picker_modal$_b.js'
import { select_palette_b } from './select_palette_b.js'
const key = 'open_color_palette_picker_modal'
export const open_color_palette_picker_modal_b:B<manage_platform_ui_AppConfiguration_Ctx, typeof key> = be_(key, (ctx)=>{
	const color_palette_picker_modal$ = color_palette_picker_modal$_b(ctx)
	const select_palette = select_palette_b(ctx)
	return open_color_palette_picker_modal as open_color_palette_picker_modal_T
	async function open_color_palette_picker_modal() {
		const data = await color_palette_picker_modal$.$.open()
		if (data) {
			select_palette(data.colorPalette)
		}
	}
})
export type open_color_palette_picker_modal_T = ()=>Promise<void>
