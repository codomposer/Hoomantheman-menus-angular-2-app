import { B, be_ } from '@ctx-core/object'
import { sortRandom } from '@menus/util'
import { manage_platform_settings$_b } from '@menus/manage-platform-ui'
import type { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx.js'
const key = 'shuffle_top_navigation_colors'
export const shuffle_top_navigation_colors_b:B<manage_platform_ui_AppConfiguration_Ctx, typeof key> = be_(key, (ctx)=>{
	const manage_platform_settings$ = manage_platform_settings$_b(ctx)
	return shuffle_top_navigation_colors as shuffle_top_navigation_colors_T
	function shuffle_top_navigation_colors() {
		const manage_platform_settings = manage_platform_settings$.$
		let colorsList = [
			manage_platform_settings.Promo_BGColor,
			manage_platform_settings.Promo_TabTextColor,
			manage_platform_settings.Promo_ActiveTabTextColor,
			manage_platform_settings.Promo_ActiveTabUnderlineColor
		]
		colorsList = sortRandom(colorsList)
		manage_platform_settings.Promo_BGColor = colorsList[0]
		manage_platform_settings.Promo_TabTextColor = colorsList[1]
		manage_platform_settings.Promo_ActiveTabTextColor = colorsList[2]
		manage_platform_settings.Promo_ActiveTabUnderlineColor = colorsList[3]
		manage_platform_settings$.$ = manage_platform_settings
	}
})
export type shuffle_top_navigation_colors_T = ()=>void
