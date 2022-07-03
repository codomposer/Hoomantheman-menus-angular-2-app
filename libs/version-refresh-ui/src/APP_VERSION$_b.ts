import { run } from '@ctx-core/function'
import { assign, B, be_ } from '@ctx-core/object'
import { has_dom } from '@ctx-core/dom'
import { readable$_set_ctx_, Readable$, subscribe_wait_timeout } from '@ctx-core/store'
import { is_path_routing } from '@menus/core-routing'
import { I } from '@ctx-core/combinators'
import { platform_settings$_b } from '@menus/http'
import { goto_b } from '@menus/ui'
import { confirmModal$_b, messageModal$_b } from '@menus/shared-ui'
import { version_a_, version_a_compare_fn } from '@menus/validation'
import { timeout_ms } from '@menus/web-config'
import { isAndroid } from '@menus/web-cordova'
import type { version_refresh_ui_Ctx } from './version_refresh_ui_Ctx.js'
import { fetch_APP_VERSION } from './fetch_APP_VERSION.js'
export const APP_VERSION_period = 60_000
const key = 'APP_VERSION$'
export const APP_VERSION$_b:B<version_refresh_ui_Ctx, typeof key> = be_(key, (ctx)=>{
	const platform_settings$ = platform_settings$_b(ctx)
	const {
		store: APP_VERSION$,
		set
	} = readable$_set_ctx_<string>(is_path_routing ? null : process.env.APP_VERSION)
	if (has_dom) {
		if (is_path_routing) {
			init().then()
		} else {
			run(async ()=>{
				await validate_backoffice_APP_VERSION()
			}).then()
		}
	}
	return assign(APP_VERSION$, {
		validate_backoffice_APP_VERSION
	}) as APP_VERSION$_T
	async function init() {
		setInterval(refresh_APP_VERSION, APP_VERSION_period)
		await refresh_APP_VERSION()
	}
	async function refresh_APP_VERSION() {
		const APP_VERSION = await fetch_APP_VERSION()
		set(APP_VERSION)
	}
	async function validate_backoffice_APP_VERSION() {
		const platform_settings = await subscribe_wait_timeout(platform_settings$, I, timeout_ms)
		const APP_VERSION = APP_VERSION$.$
		const goto = goto_b(ctx)
		if (platform_settings.BackOfficeMinForcedAppVersion) {
			if (version_a_compare_fn(
				version_a_(platform_settings.BackOfficeMinForcedAppVersion),
				version_a_(APP_VERSION)
			) > 0) {
				const messageModal$ = messageModal$_b(ctx)
				const messageModal = await subscribe_wait_timeout(messageModal$, I, timeout_ms)
				await messageModal.open({
					title: 'Update App',
					message: 'You need to update your application to continue.',
					ok_text: 'Update',
				})
				await open_store_link()
			}
		} else if (platform_settings.BackOfficeMinAppVersion) {
			if (version_a_compare_fn(
				version_a_(platform_settings.BackOfficeMinAppVersion),
				version_a_(APP_VERSION)
			) > 0) {
				const confirmModal$ = confirmModal$_b(ctx)
				const confirmModal = await subscribe_wait_timeout(confirmModal$, I, timeout_ms)
				const confirm = await confirmModal.open({
					title: 'Update App',
					message: 'Please consider updating your application to use latest features.',
					ok_text: 'Update',
					cancel_text: 'Continue',
				})
				if (confirm) {
					await open_store_link()
				}
			}
		}
		async function open_store_link() {
			const store_link =
				isAndroid
				? (platform_settings.BackOffice_App_Android_Store_Link || 'https://play.google.com/store/apps')
				: (platform_settings.BackOffice_App_IOS_Store_Link || 'https://itunes.apple.com')
			await goto(store_link)
		}
	}
})
export interface APP_VERSION$_T extends Readable$<string> {
	validate_backoffice_APP_VERSION():Promise<void>
}
