import { ro_user_common_Ctx } from '@menus/ro-user-common'
import { ui_Ctx } from '@menus/ui'
import { ro_fetch_T } from './ro_fetch_b.js'
import { ro_http_ctx_I } from './ro_http_ctx_I.generated.js'
export interface ro_http_Ctx<Out extends unknown = unknown> extends ro_http_ctx_I, ui_Ctx, ro_user_common_Ctx {
	ro_fetch?:ro_fetch_T<Out>
}
