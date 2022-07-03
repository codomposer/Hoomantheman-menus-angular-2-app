import { B, be_ } from '@ctx-core/object'
import { colorPalette_T } from '@menus/color'
import { manage_platform_settings$_b } from '@menus/manage-platform-ui'
import type { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx.js'
import { selected_palette_item$_b } from './selected_palette_item$_b.js'
const key = 'select_palette'
export const select_palette_b:B<manage_platform_ui_AppConfiguration_Ctx, typeof key> = be_(key, (ctx)=>{
	const manage_platform_settings$ = manage_platform_settings$_b(ctx)
	const selected_palette_item$ = selected_palette_item$_b(ctx)
	return select_palette
	/**
	 * Colors
	 */
	function select_palette(selected_palette_item:colorPalette_T) {
		selected_palette_item$.$ = selected_palette_item
		const manage_platform_settings = manage_platform_settings$.$
		manage_platform_settings.Color_Balanced = selected_palette_item[0]
		manage_platform_settings.Color_Positive = selected_palette_item[1]
		manage_platform_settings.Color_Assertive = selected_palette_item[2]
		manage_platform_settings.Color_Gray = selected_palette_item[3]
		manage_platform_settings.Color_Text1 = selected_palette_item[3]
		manage_platform_settings.Color_Text2 = selected_palette_item[4]
		manage_platform_settings.Color_Text3 = selected_palette_item[4]
		manage_platform_settings.Promo_BGColor = selected_palette_item[0]
		manage_platform_settings.Promo_TabTextColor = selected_palette_item[1]
		manage_platform_settings.Promo_ActiveTabTextColor = selected_palette_item[2]
		manage_platform_settings.Promo_ActiveTabUnderlineColor = selected_palette_item[3]
		manage_platform_settings.Color_UserMapIcon = selected_palette_item[0]
		manage_platform_settings.Color_RestMapIcon = selected_palette_item[1]
		manage_platform_settings.Color_SelectedMapIcon = selected_palette_item[2]
		manage_platform_settings$.$ = manage_platform_settings
	}
})
export type select_palette_T = (selected_palette_item:colorPalette_T)=>void
