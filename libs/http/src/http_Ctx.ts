import type { auth_Ctx } from '@menus/auth'
import type { consumer_user_common_Ctx } from '@menus/consumer-user-common'
import type { Gps } from '@menus/platform-settings-lib'
import type { notyf_Ctx } from '@menus/notyf'
import type { ui_Ctx } from '@menus/ui'
import type { consumer_request_url__T } from './consumer_request_url__b.js'
import type { fetch_api_request_T } from './fetch_api_request_b.js'
import type { http_ctx_I } from './http_ctx_I.generated.js'
import type { init_gps$_T } from './init_gps$_b'
import type { platform_settings$_T } from './platform_settings$_b.js'
import type { PublicKey$_T } from './PublicKey$_b.js'
import type { refresh_auth_token_T } from './refresh_auth_token_b.js'
export interface http_Ctx<Out extends unknown = unknown>
	extends http_ctx_I, auth_Ctx, consumer_user_common_Ctx, notyf_Ctx, ui_Ctx {
	consumer_request_url_?:consumer_request_url__T
	fetch_api_request?:fetch_api_request_T<Out>
	init_gps$?:init_gps$_T
	gps?:Gps
	refresh_auth_token?:refresh_auth_token_T
	platform_settings?:platform_settings$_T
	PublicKey?:PublicKey$_T
}
