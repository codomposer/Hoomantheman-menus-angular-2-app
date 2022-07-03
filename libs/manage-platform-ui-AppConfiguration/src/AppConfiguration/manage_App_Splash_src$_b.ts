import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { photo_placeholder_path } from '@menus/web-config'
import { manage_platform_settings$_b } from '@menus/manage-platform-ui'
import type { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx.js'
const key = 'manage_App_Splash_src$'
export const manage_App_Splash_src$_b:B<manage_platform_ui_AppConfiguration_Ctx, typeof key> = be_(key, (ctx)=>{
	const manage_platform_settings$ = manage_platform_settings$_b(ctx)
	const manage_App_Splash_src$ = derived$(manage_platform_settings$,
		manage_platform_settings=>{
			return manage_platform_settings?.App_Splash || photo_placeholder_path
		}
	)
	return manage_App_Splash_src$ as manage_App_Splash_src$_T
})
export type manage_App_Splash_src$_T = Readable$<string>
