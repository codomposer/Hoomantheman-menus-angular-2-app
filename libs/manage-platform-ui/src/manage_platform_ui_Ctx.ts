import type { consumer_http_Ctx } from '@menus/consumer-http'
import type { dom_Ctx } from '@menus/dom'
import type { layout_ui_Ctx } from '@menus/layout-ui'
import type { notyf_Ctx } from '@menus/notyf'
import type { vibrant_Ctx } from '@menus/vibrant'
import type { ro_http_Ctx } from '@menus/ro-http'
import type { manage_platform_ui_ctx_I } from './manage_platform_ui_ctx_I.generated.js'
export interface manage_platform_ui_Ctx extends manage_platform_ui_ctx_I,
	consumer_http_Ctx, dom_Ctx, layout_ui_Ctx, notyf_Ctx, ro_http_Ctx, vibrant_Ctx {
}
