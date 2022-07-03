import type { dom_Ctx } from '@menus/dom'
import type { page_Ctx } from '@menus/page'
import type { ro_restaurant_ui_Ctx } from '@menus/ro-restaurant-ui'
import type { ro_http_Ctx } from '@menus/ro-http'
import type { ro_menu_ui_ctx_I } from './ro_menu_ui_ctx_I.generated.js'
export interface ro_menu_ui_Ctx extends ro_menu_ui_ctx_I, dom_Ctx, page_Ctx, ro_http_Ctx, ro_restaurant_ui_Ctx {}
