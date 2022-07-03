import { B, be_ } from '@ctx-core/object'
import { manage_platform_busy$_b, manage_platform_settings$_b } from '@menus/manage-platform-ui'
import {
	API_PLATFORM_IMAGE_icon_del_b, API_PLATFORM_IMAGE_splash_del_b, ro_httpClient_b, RoRequestQuery
} from '@menus/ro-http'
import type { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx.js'
import type { AppConfiguration_prop_name_T } from './AppConfiguration_prop_name_T.js'
const key = 'remove_Image'
export const remove_Image_b:B<manage_platform_ui_AppConfiguration_Ctx, typeof key> = be_(key, (ctx)=>{
	const API_PLATFORM_IMAGE_icon_del = API_PLATFORM_IMAGE_icon_del_b(ctx)
	const API_PLATFORM_IMAGE_splash_del = API_PLATFORM_IMAGE_splash_del_b(ctx)
	const manage_platform_busy$ = manage_platform_busy$_b(ctx)
	const manage_platform_settings$ = manage_platform_settings$_b(ctx)
	const ro_httpClient = ro_httpClient_b(ctx)
	return remove_Image as remove_Image_T
	async function remove_Image(evt:MouseEvent, prop_name:AppConfiguration_prop_name_T) {
		const imageInputElement = evt.target as HTMLInputElement
		manage_platform_busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			const manage_platform_settings = manage_platform_settings$.$
			requestData.pcpk = manage_platform_settings.PublicKey
			if (prop_name === 'App_Logo') {
				manage_platform_settings.App_Logo = null
			} else if (prop_name === 'App_Icon') {
				await API_PLATFORM_IMAGE_icon_del(requestData)
				manage_platform_settings.App_Icon = null
			} else if (prop_name === 'App_Splash') {
				await API_PLATFORM_IMAGE_splash_del(requestData)
				manage_platform_settings.App_Splash = null
			} else if (prop_name === 'App_Flyer') {
				await ro_httpClient.API_PLATFORM_IMAGE_flyer_focus_del(requestData)
				manage_platform_settings.App_Flyer = null
			} else if (prop_name === 'App_Flyer_Mobile') {
				await ro_httpClient.API_PLATFORM_IMAGE_flyer_mobile_del(requestData)
				manage_platform_settings.App_Flyer_Mobile = null
			}
			manage_platform_settings$.$ = manage_platform_settings
			imageInputElement.value = ''
		} finally {
			manage_platform_busy$.$ = false
		}
	}
})
export type remove_Image_T = (evt:MouseEvent, prop_name:AppConfiguration_prop_name_T)=>Promise<void>
