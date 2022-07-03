import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { manage_platform_settings$_b } from '@menus/manage-platform-ui'
import type { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx.js'
const key = 'manage_App_Icon$'
export const manage_App_Icon$_b:B<manage_platform_ui_AppConfiguration_Ctx, typeof key> = be_(key, (ctx)=>{
	const manage_platform_settings$ = manage_platform_settings$_b(ctx)
	return derived$(manage_platform_settings$, manage_platform_settings=>
		manage_platform_settings?.App_Icon
	) as manage_App_Icon$_T
})
export type manage_App_Icon$_T = Readable$<string>
