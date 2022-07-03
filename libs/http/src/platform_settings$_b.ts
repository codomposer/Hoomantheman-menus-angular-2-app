import { be_, assign, B } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { PlatformSettings } from '@menus/platform-settings-lib'
import { STATUS_SUCCESS } from '@menus/web-config'
import { gps$_b } from './gps$_b.js'
import type { http_Ctx } from './http_Ctx.js'
const key = 'platform_settings$'
export const platform_settings$_b:B<http_Ctx, typeof key> = be_(key, ctx=>{
	const gps$ = gps$_b(ctx)
	const platform_settings$ = derived$(gps$, gps=>{
		if (!gps) return
		const platform_settings = new PlatformSettings()
		if (gps.Status === STATUS_SUCCESS) {
			assign(platform_settings, gps.Data as PlatformSettings)
		}
		return platform_settings
	})
	return platform_settings$
})
export type platform_settings$_T = Readable$<PlatformSettings>
