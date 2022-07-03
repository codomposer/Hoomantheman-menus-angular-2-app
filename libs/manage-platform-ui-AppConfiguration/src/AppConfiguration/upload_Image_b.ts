import { B, be_ } from '@ctx-core/object'
import { manage_platform_busy$_b, manage_platform_settings$_b } from '@menus/manage-platform-ui'
import { notyf_error_b } from '@menus/notyf'
import {
	API_PLATFORM_IMAGE_icon_upload_b, API_PLATFORM_IMAGE_splash_upload_b, ro_httpClient_b, RoRequestQuery
} from '@menus/ro-http'
import { getBytesByMb } from '@menus/util'
import { RO_IMG_TYPE_PNG, STATUS_ERROR, STATUS_SUCCESS } from '@menus/web-config'
import type { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx.js'
import type { AppConfiguration_prop_name_T } from './AppConfiguration_prop_name_T.js'
import {
	APP_FLYER_MAX_IMG_SIZE, APP_FLYER_MOBILE_MAX_IMG_SIZE, APP_ICON_MAX_IMG_SIZE, APP_LOGO_MAX_IMG_SIZE,
	APP_SPLASH_MAX_IMG_SIZE,
} from './const.js'
import { manage_App_image_errors_ctx$_b } from './manage_App_image_errors_ctx$_b.js'
const key = 'upload_Image'
export const upload_Image_b:B<manage_platform_ui_AppConfiguration_Ctx, typeof key> = be_(key, (ctx)=>{
	const API_PLATFORM_IMAGE_icon_upload = API_PLATFORM_IMAGE_icon_upload_b(ctx)
	const API_PLATFORM_IMAGE_splash_upload = API_PLATFORM_IMAGE_splash_upload_b(ctx)
	const manage_App_image_errors_ctx$ = manage_App_image_errors_ctx$_b(ctx)
	const manage_platform_busy$ = manage_platform_busy$_b(ctx)
	const manage_platform_settings$ = manage_platform_settings$_b(ctx)
	const notyf_error = notyf_error_b(ctx)
	const ro_httpClient = ro_httpClient_b(ctx)
	return upload_Image as upload_Image_T
	async function upload_Image(evt:InputEvent, prop_name:AppConfiguration_prop_name_T) {
		const input_el = evt.target as HTMLInputElement
		manage_platform_busy$.$ = true
		try {
			manage_App_image_errors_ctx$.refresh({
				[prop_name]: null
			})
			const { name, maxSize, dimensions } = upload_Image_name_maxSize_dimensions_ctx_(prop_name)
			const file_length:number = input_el.files.length
			// a file was selected
			if (file_length) {
				const file = input_el.files.item(0)
				let error_msg:string =
					RO_IMG_TYPE_PNG !== file.type
					? 'Invalid file format. Only PNG is allowed.'
					: file.size > getBytesByMb(maxSize)
						? `File size can't be greater then ${maxSize}MB.`
						: null
				if (error_msg) {
					input_el.value = ''
					await notyf_error(error_msg)
					manage_App_image_errors_ctx$.refresh({
						[prop_name]: [error_msg]
					})
					return
				}
				const form_data = new FormData()
				form_data.append('file[]', file)
				const requestData = new RoRequestQuery()
				const manage_platform_settings = manage_platform_settings$.$
				requestData.pcpk = manage_platform_settings.PublicKey
				let response = null
				if (prop_name === 'App_Icon') {
					response = await API_PLATFORM_IMAGE_icon_upload(requestData, form_data)
					if (response.Status === STATUS_SUCCESS) {
						manage_platform_settings$.refresh({ App_Icon: response.Data })
					}
				} else if (prop_name === 'App_Splash') {
					response = await API_PLATFORM_IMAGE_splash_upload(requestData, form_data)
					if (response.Status === STATUS_SUCCESS) {
						manage_platform_settings$.refresh({ App_Splash: response.Data })
					}
				} else if (prop_name === 'App_Flyer') {
					response = await ro_httpClient.API_PLATFORM_IMAGE_flyer_focus_upload(requestData, form_data)
					if (response.Status === STATUS_SUCCESS) {
						manage_platform_settings$.refresh({ App_Flyer: response.Data })
					}
				} else if (prop_name === 'App_Flyer_Mobile') {
					response = await ro_httpClient.API_PLATFORM_IMAGE_flyer_mobile_upload(requestData, form_data)
					if (response.Status === STATUS_SUCCESS) {
						manage_platform_settings$.refresh({ App_Flyer_Mobile: response.Data })
					}
				}
				if (response.Status === STATUS_SUCCESS) {
					manage_App_image_errors_ctx$.refresh({
						[prop_name]: null
					})
				} else if (response.Status === STATUS_ERROR) {
					error_msg =
						response.Code === 'ERR_INVALID_IMG_DIMENSION'
						? `${name ? name : 'Image'} dimensions should be ${dimensions ? dimensions : 'valid'}.`
						: response.Code === 'ERR_INVALID_IMG_FORMAT'
							? 'Invalid file format. Only PNG is allowed.'
							: 'Unable to upload image, Please try again.'
					await notyf_error(error_msg)
					manage_App_image_errors_ctx$.refresh({
						[prop_name]: [error_msg]
					})
				}
			}
		} finally {
			input_el.value = ''
			manage_platform_busy$.$ = false
		}
	}
})
export type upload_Image_T = (evt:InputEvent, prop_name:AppConfiguration_prop_name_T)=>Promise<void>
function upload_Image_name_maxSize_dimensions_ctx_(
	prop_name:AppConfiguration_prop_name_T
):upload_Image_name_maxSize_dimensions_ctx_T {
	if (prop_name === 'App_Logo') {
		return {
			name: 'App Logo',
			maxSize: APP_LOGO_MAX_IMG_SIZE,
			dimensions: null,
		}
	} else if (prop_name === 'App_Icon') {
		return {
			name: 'App Icon',
			maxSize: APP_ICON_MAX_IMG_SIZE,
			dimensions: '1024x1024',
		}
	} else if (prop_name === 'App_Splash') {
		return {
			name: 'App Splash',
			maxSize: APP_SPLASH_MAX_IMG_SIZE,
			dimensions: '2732x2732',
		}
	} else if (prop_name === 'App_Flyer') {
		return {
			name: 'App Flyer',
			maxSize: APP_FLYER_MAX_IMG_SIZE,
			dimensions: '2732x2732',
		}
	} else if (prop_name === 'App_Flyer_Mobile') {
		return {
			name: 'App Flyer Mobile',
			maxSize: APP_FLYER_MOBILE_MAX_IMG_SIZE,
			dimensions: '2732x2732',
		}
	}
}
export interface upload_Image_name_maxSize_dimensions_ctx_T {
	name:string
	maxSize:number
	dimensions:string
}
