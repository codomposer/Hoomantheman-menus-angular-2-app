import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { event_log$_b } from '@ctx-core/event-log'
import { manage_platform_settings$_b } from '@menus/manage-platform-ui'
import { photo_placeholder_path } from '@menus/web-config'
import type { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx.js'
const key = 'manage_App_Icon_src$'
export const manage_App_Icon_src$_b:B<manage_platform_ui_AppConfiguration_Ctx, typeof key> = be_(key, (ctx)=>{
	const event_log$ = event_log$_b(ctx)
	const manage_platform_settings$ = manage_platform_settings$_b(ctx)
	const manage_App_Icon_src$ = derived$(manage_platform_settings$,
		manage_platform_settings=>{
			return manage_platform_settings?.App_Icon || photo_placeholder_path
		}
	)
	manage_App_Icon_src$.subscribe(manage_App_Icon_src=>event_log$.add({ manage_App_Icon_src }))
	return manage_App_Icon_src$
})
export type manage_App_Icon_src$_T = Readable$<string>
