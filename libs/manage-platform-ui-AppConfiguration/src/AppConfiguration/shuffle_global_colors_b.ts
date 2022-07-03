import { B, be_ } from '@ctx-core/object'
import { sortRandom } from '@menus/util'
import { manage_platform_settings$_b } from '@menus/manage-platform-ui'
import type { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx.js'
const key = 'shuffle_global_colors'
export const shuffle_global_colors_b:B<manage_platform_ui_AppConfiguration_Ctx, typeof key> = be_(key, (ctx)=>{
	const manage_platform_settings$ = manage_platform_settings$_b(ctx)
	return shuffle_global_colors as shuffle_global_colors_T
	function shuffle_global_colors() {
		const manage_platform_settings = manage_platform_settings$.$
		let colorsList = [
			manage_platform_settings.Color_Balanced,
			manage_platform_settings.Color_Positive,
			manage_platform_settings.Color_Assertive,
			manage_platform_settings.Color_Gray,
			manage_platform_settings.Color_Text1,
			manage_platform_settings.Color_Text2,
			manage_platform_settings.Color_Text3
		]
		colorsList = sortRandom(colorsList)
		manage_platform_settings.Color_Balanced = colorsList[0]
		manage_platform_settings.Color_Positive = colorsList[1]
		manage_platform_settings.Color_Assertive = colorsList[2]
		manage_platform_settings.Color_Gray = colorsList[3]
		manage_platform_settings.Color_Text1 = colorsList[4]
		manage_platform_settings.Color_Text2 = colorsList[5]
		manage_platform_settings.Color_Text3 = colorsList[6]
		manage_platform_settings$.$ = manage_platform_settings
	}
})
export type shuffle_global_colors_T = ()=>void
