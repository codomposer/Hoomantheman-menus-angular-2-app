import { consumer_http_Ctx } from '@menus/consumer-http'
import type { user_payment_ctx_I } from './user_payment_ctx_I.generated.js'
export interface user_payment_Ctx extends user_payment_ctx_I,
	consumer_http_Ctx {
}
