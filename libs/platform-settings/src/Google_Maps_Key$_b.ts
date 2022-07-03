import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { Google_Maps_Key__default } from '@menus/web-config'
import { platform_settings$_b } from '@menus/http'
import type { platform_settings_Ctx } from './platform_settings_Ctx.js'
const key = 'Google_Maps_Key$'
export const Google_Maps_Key$_b:B<platform_settings_Ctx, typeof key> = be_(key, ctx=>
	derived$(platform_settings$_b(ctx), platform_settings=>
		platform_settings?.Google_Maps_Key || Google_Maps_Key__default
	) as Google_Maps_Key$_T)
export type Google_Maps_Key$_T = Readable$<string>
