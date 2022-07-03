import { B, be_ } from '@ctx-core/object'
import { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx'
import { sortRandom } from '@menus/util'
import { colorPalette_T } from '@menus/color'
import { select_palette_b } from './select_palette_b.js'
import { selected_palette_item$_b } from './selected_palette_item$_b.js'
const key = 'shuffle_palette'
export const shuffle_palette_b:B<manage_platform_ui_AppConfiguration_Ctx, typeof key> = be_(key, (ctx)=>{
	const select_palette = select_palette_b(ctx)
	const selected_palette_item$ = selected_palette_item$_b(ctx)
	return shuffle_palette as shuffle_palette_T
	function shuffle_palette() {
		const paletteItem = sortRandom(selected_palette_item$.$) as colorPalette_T
		select_palette(paletteItem)
	}
})
export type shuffle_palette_T = ()=>void
