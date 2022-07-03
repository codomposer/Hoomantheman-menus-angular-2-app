import type { consumer_http_Ctx } from '@menus/consumer-http'
import type { notyf_Ctx } from '@menus/notyf'
import type { layout_ui_Ctx } from '@menus/layout-ui'
import type { dom_Ctx } from '@menus/dom'
export interface settings_ui_Ctx extends consumer_http_Ctx, notyf_Ctx, layout_ui_Ctx, dom_Ctx {}
