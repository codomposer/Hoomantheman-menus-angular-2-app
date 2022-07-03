import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { default_Google_Analytics_ID } from '@menus/web-config'
import { platform_settings$_b } from '@menus/http'
import type { platform_settings_Ctx } from './platform_settings_Ctx.js'
const key = 'Google_Analytics_ID$'
export const Google_Analytics_ID$_b:B<platform_settings_Ctx, typeof key> = be_(key, ctx=>
	derived$(platform_settings$_b(ctx), platform_settings=>
		platform_settings?.Google_Analytics_ID || default_Google_Analytics_ID
	) as Google_Analytics_ID$_T)
export type Google_Analytics_ID$_T = Readable$<string>
