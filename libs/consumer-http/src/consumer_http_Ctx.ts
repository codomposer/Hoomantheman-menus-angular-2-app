import { ui_Ctx } from '@menus/ui'
import { consumer_http_client_T } from './consumer_http_client_b.js'
import { goto_login_T } from './goto_login_b.js'
import { consumer_http_ctx_I } from './consumer_http_ctx_I.generated.js'
export interface consumer_http_Ctx extends consumer_http_ctx_I, ui_Ctx {
	consumer_http_client?:consumer_http_client_T
	goto_login?:goto_login_T
}
