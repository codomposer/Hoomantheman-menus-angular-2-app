import { B, be_ } from '@ctx-core/object'
import { I } from '@ctx-core/combinators'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { has_dom } from '@ctx-core/dom'
import { initWithProviders } from '@menus/social-login'
import { DEFAULT_FB_CLIENT_ID, GOOGLE_PLUS_WEB_CLIENT_ID__default, timeout_ms } from '@menus/web-config'
import { platform_settings$_b } from '@menus/http'
import { init_google_analytics_b } from './init_google_analytics_b.js'
import { init_app_promise_b } from './init_app_promise_b.js'
import { init_google_maps_b } from './init_google_maps_b.js'
import { init_google_maps_promise_b } from './init_google_maps_promise_b.js'
import { app_initializer_Ctx } from './app_initializer_Ctx.js'
const key = 'init_app'
export const init_app_b:B<app_initializer_Ctx, typeof key> = be_(key, ctx=>{
	const init_google_analytics = init_google_analytics_b(ctx)
	const init_google_maps = init_google_maps_b(ctx)
	const init_google_maps_promise = init_google_maps_promise_b(ctx)
	const init_app_promise = init_app_promise_b(ctx)
	const platform_settings = platform_settings$_b(ctx)
	return init_app as init_app_T
	async function init_app() {
		try {
			if (has_dom) {
				const $platform_settings = await subscribe_wait_timeout(platform_settings, I, timeout_ms)
				initWithProviders({
					google: {
						clientId:
							$platform_settings?.GOOGLE_PLUS_WEB_CLIENT_ID
							|| GOOGLE_PLUS_WEB_CLIENT_ID__default,
					},
					facebook: {
						clientId:
							$platform_settings?.FB_CLIENT_ID
							|| DEFAULT_FB_CLIENT_ID,
						apiVersion: 'v2.4',
					},
				})
			}
			await Promise.all([init_google_analytics(), init_google_maps()])
			await init_google_maps_promise
			init_app_promise.resolve()
		} catch (err) {
			console.error(err)
			init_app_promise.reject(err)
		}
		return init_app_promise
	}
})
export type init_app_T = (host:string)=>Promise<void>
