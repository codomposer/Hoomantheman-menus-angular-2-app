import { B, be_ } from '@ctx-core/object'
import { _urn_url } from '@ctx-core/uri'
import { derived$, Readable$ } from '@ctx-core/store'
import { platform_settings$_b } from '@menus/http'
import type { platform_settings_Ctx } from './platform_settings_Ctx.js'
const key = 'SocialLink_Twitter$'
export const SocialLink_Twitter$_b:B<platform_settings_Ctx, typeof key> = be_(key, ctx=>
	derived$(platform_settings$_b(ctx), platform_settings=>
		_urn_url(platform_settings?.SocialLink_Twitter)
	) as SocialLink_Twitter$_T
)
export type SocialLink_Twitter$_T = Readable$<string>
