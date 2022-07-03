import type { ui_Ctx } from '@menus/ui'
import type { modal_Ctx } from '@menus/modal'
import type { color_ui_ctx_I } from './color_ui_ctx_I.generated.js'
export interface color_ui_Ctx extends color_ui_ctx_I, ui_Ctx, modal_Ctx {
}
