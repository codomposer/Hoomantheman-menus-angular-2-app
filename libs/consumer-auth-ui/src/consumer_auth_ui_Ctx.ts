import type { page_Ctx } from '@menus/page'
import type { consumer_http_Ctx } from '@menus/consumer-http'
import type { notyf_Ctx } from '@menus/notyf'
import type { consumer_auth_ui_ctx_I } from './consumer_auth_ui_ctx_I.generated.js'
export interface consumer_auth_ui_Ctx extends consumer_auth_ui_ctx_I,
	page_Ctx, consumer_http_Ctx, notyf_Ctx {
}
