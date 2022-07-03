import { B, be_ } from '@ctx-core/object'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { ro_httpClient_b, RoRequestQuery } from '@menus/ro-http'
import { deep_clone } from '@menus/util'
import { STATUS_SUCCESS } from '@menus/web-config'
import { apply_rules_platform_settings } from './apply_rules_platform_settings.js'
import { formatted_App_ID_ } from './formatted_App_ID_.js'
import { platform_settings_errors$_b } from './platform_settings_errors$_b.js'
import { platform_settings_valid$_b } from './platform_settings_valid$_b.js'
import { manage_platform_settings_save_busy$_b } from './manage_platform_settings_save_busy$_b.js'
import { manage_platform_settings$_b } from './manage_platform_settings$_b.js'
import type { manage_platform_ui_Ctx } from './manage_platform_ui_Ctx.js'
import { selected_platform_company$_b } from './selected_platform_company$_b.js'
const key = 'save_manage_platform_settings'
export const save_manage_platform_settings_b:B<manage_platform_ui_Ctx, typeof key> = be_<manage_platform_ui_Ctx, typeof key>(key, function (ctx) {
	const ro_httpClient = ro_httpClient_b(ctx)
	const notyf_error = notyf_error_b(ctx)
	const notyf_success = notyf_success_b(ctx)
	const manage_platform_settings$ = manage_platform_settings$_b(ctx)
	const manage_platform_settings_save_busy$ = manage_platform_settings_save_busy$_b(ctx)
	const platform_settings_valid$ = platform_settings_valid$_b(ctx)
	const selected_platform_company$ = selected_platform_company$_b(ctx)
	return save_manage_platform_settings as save_manage_platform_settings_T
	async function save_manage_platform_settings() {
		let manage_platform_settings = manage_platform_settings$.$
		if (platform_settings_valid$.$) {
			manage_platform_settings_save_busy$.set(true)
			try {
				apply_rules_platform_settings(manage_platform_settings)
				manage_platform_settings$.set(manage_platform_settings)
				manage_platform_settings = deep_clone(manage_platform_settings)
				manage_platform_settings.App_ID = formatted_App_ID_(manage_platform_settings.App_ID)
				const requestData = new RoRequestQuery()
				const selected_platform_company = selected_platform_company$.$
				if (selected_platform_company) {
					requestData.pcpk = selected_platform_company.PublicKey
				}
				const payload = await ro_httpClient.API_PLATFORM_info_update(requestData, manage_platform_settings)
				if (payload.Status === STATUS_SUCCESS) {
					await notyf_success('Settings saved successfully.')
					manage_platform_settings$.set(manage_platform_settings)
				}
			} finally {
				manage_platform_settings_save_busy$.set(false)
			}
		} else {
			await notyf_error('Form contains some errors.')
			const platform_settings_errors$ = platform_settings_errors$_b(ctx)
			console.error(platform_settings_errors$)
			console.error({
				manage_platform_settings,
				platform_settings_errors: platform_settings_errors$.$,
			})
		}
	}
})
export type save_manage_platform_settings_T = ()=>Promise<void>
