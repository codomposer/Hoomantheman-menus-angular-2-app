import { B, be_ } from '@ctx-core/object'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx'
import { selected_platform_company$_b } from '@menus/manage-platform-ui'
const key = 'manage_App_image_errors_ctx$'
export const manage_App_image_errors_ctx$_b:B<manage_platform_ui_AppConfiguration_Ctx, typeof key> = be_(key, (ctx)=>{
	const manage_App_image_errors_ctx$ = refresh_writable_(manage_App_image_errors_ctx_())
	const selected_platform_company$ = selected_platform_company$_b(ctx)
	selected_platform_company$.subscribe(()=>
		manage_App_image_errors_ctx$.$ = manage_App_image_errors_ctx_())
	return manage_App_image_errors_ctx$
})
export type manage_App_image_errors_ctx$_T = refresh_writable_T<manage_App_image_errors_ctx_T>
export function manage_App_image_errors_ctx_() {
	return {
		App_Logo: [],
		App_Icon: [],
		App_Splash: [],
	}
}
export interface manage_App_image_errors_ctx_T {
	App_Logo:string[]
	App_Icon:string[]
	App_Splash:string[]
	App_Flyer:string[]
	App_Flyer_Mobile:string[]
}

