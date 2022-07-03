import type { http_Ctx } from '@menus/http'
import type { ui_Ctx } from '@menus/ui'
import type { route_ctx_I } from './route_ctx_I.generated.js'
export interface route_Ctx extends route_ctx_I, http_Ctx, ui_Ctx {}
