import { B, be_ } from '@ctx-core/object'
import { sortRandom } from '@menus/util'
import { manage_platform_settings$_b } from '@menus/manage-platform-ui'
import type { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx.js'
const key = 'shuffle_map_colors'
export const shuffle_map_colors_b:B<manage_platform_ui_AppConfiguration_Ctx, typeof key> = be_(key, (ctx)=>{
	const manage_platform_settings$ = manage_platform_settings$_b(ctx)
	return shuffle_map_colors as shuffle_map_colors_T
	function shuffle_map_colors() {
		const manage_platform_settings = manage_platform_settings$.$
		let colorsList = [
			manage_platform_settings.Color_UserMapIcon,
			manage_platform_settings.Color_RestMapIcon,
			manage_platform_settings.Color_SelectedMapIcon
		]
		colorsList = sortRandom(colorsList)
		manage_platform_settings.Color_UserMapIcon = colorsList[0]
		manage_platform_settings.Color_RestMapIcon = colorsList[1]
		manage_platform_settings.Color_SelectedMapIcon = colorsList[2]
		manage_platform_settings$.$ = manage_platform_settings
	}
})
export type shuffle_map_colors_T = ()=>void
