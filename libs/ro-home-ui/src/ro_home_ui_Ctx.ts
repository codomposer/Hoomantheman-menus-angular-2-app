import type { ro_user_Ctx } from '@menus/ro-user'
import type { dom_Ctx } from '@menus/dom'
import type { layout_ui_Ctx } from '@menus/layout-ui'
import type { ro_layout_ui_Ctx } from '@menus/ro-layout-ui'
export interface ro_home_ui_Ctx extends ro_user_Ctx, dom_Ctx, layout_ui_Ctx, ro_layout_ui_Ctx {}
