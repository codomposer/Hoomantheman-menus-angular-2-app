import type { shared_ui_Ctx } from '@menus/shared-ui'
import type { layout_ui_Ctx } from '@menus/layout-ui'
import type { version_refresh_ui_Ctx } from '@menus/version-refresh-ui'
import type { ro_layout_ui_ctx_I } from './ro_layout_ui_ctx_I.generated.js'
export interface ro_layout_ui_Ctx extends ro_layout_ui_ctx_I,
	shared_ui_Ctx, layout_ui_Ctx, version_refresh_ui_Ctx {
}
