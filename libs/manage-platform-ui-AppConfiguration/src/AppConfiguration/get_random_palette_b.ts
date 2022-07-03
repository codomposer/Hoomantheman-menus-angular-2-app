import { B, be_ } from '@ctx-core/object'
import { getRandomInt} from '@menus/util'
import { colorPaletteList } from '@menus/color'
import { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx.js'
import { select_palette_b } from './select_palette_b.js'
const key = 'get_random_palette'
export const get_random_palette_b:B<manage_platform_ui_AppConfiguration_Ctx, typeof key> = be_(key, (ctx)=>{
	const select_palette = select_palette_b(ctx)
	return get_random_palette as get_random_palette_T
	function get_random_palette() {
		const randomNumber = getRandomInt(0, colorPaletteList.length - 1)
		select_palette(colorPaletteList[randomNumber])
	}
})
export type get_random_palette_T = ()=>void
