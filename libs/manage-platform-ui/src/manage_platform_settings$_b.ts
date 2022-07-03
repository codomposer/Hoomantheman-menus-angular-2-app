import { B, be_ } from '@ctx-core/object'
import { has_dom } from '@ctx-core/dom'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import type { PlatformSettings } from '@menus/platform-settings'
import { ro_httpClient_b, RoRequestQuery } from '@menus/ro-http'
import { STATUS_SUCCESS } from '@menus/web-config'
import type { manage_platform_ui_Ctx } from './manage_platform_ui_Ctx.js'
import { apply_rules_platform_settings } from './apply_rules_platform_settings.js'
import { manage_platform_busy$_b } from './manage_platform_busy$_b.js'
import { selected_platform_company$_b } from './selected_platform_company$_b.js'
const key = 'manage_platform_settings$'
export const manage_platform_settings$_b:B<manage_platform_ui_Ctx, typeof key> = be_(key, function (ctx) {
	const manage_platform_busy$ = manage_platform_busy$_b(ctx)
	const ro_httpClient = ro_httpClient_b(ctx)
	const selected_platform_company$ = selected_platform_company$_b(ctx)
	const manage_platform_settings$ = refresh_writable_<PlatformSettings>(null)
	if (has_dom) {
		selected_platform_company$.subscribe(async (_selected_platform_company)=>{
			manage_platform_busy$.$ = true
			try {
				await load_company_platform_settings()
			} finally {
				manage_platform_busy$.$ = false
			}
		})
	}
	return manage_platform_settings$ as manage_platform_settings$_T
	async function load_company_platform_settings() {
		// Platform Company Settings
		const selected_platform_company = selected_platform_company$.$
		if (selected_platform_company) {
			const requestData = new RoRequestQuery()
			requestData.pcpk = selected_platform_company.PublicKey
			const payload = await ro_httpClient.API_PLATFORM_info_info(requestData)
			if (payload.Status === STATUS_SUCCESS) {
				const manage_platform_settings = payload.Data
				apply_rules_platform_settings(manage_platform_settings)
				manage_platform_settings$.$ = manage_platform_settings
			}
		}
	}
})
export type manage_platform_settings$_T = refresh_writable_T<PlatformSettings>
