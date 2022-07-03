import type { route_Ctx } from '@ctx-core/route'
import type { consumer_http_Ctx } from '@menus/consumer-http'
import type { modal_Ctx } from '@menus/modal'
import type { close_account_T } from './close_account_b.js'
export interface consumer_user_ui_Ctx
	extends modal_Ctx, consumer_http_Ctx, route_Ctx {
	close_account?:close_account_T
}
