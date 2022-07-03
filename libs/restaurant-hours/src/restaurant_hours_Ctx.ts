import type { consumer_http_Ctx } from '@menus/consumer-http'
import type { date_Ctx } from '@menus/date'
import type { restaurant_hours_ctx_I } from './restaurant_hours_ctx_I.generated.js'
export interface restaurant_hours_Ctx extends restaurant_hours_ctx_I,
	consumer_http_Ctx, date_Ctx {
}
