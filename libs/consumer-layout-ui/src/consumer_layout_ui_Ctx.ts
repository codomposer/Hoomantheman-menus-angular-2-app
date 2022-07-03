import type { layout_ui_Ctx } from '@menus/layout-ui'
import type { ui_Ctx } from '@menus/ui'
import type { search_menu_common_Ctx } from '@menus/search-menu-common'
import type { consumer_layout_ui_ctx_I } from './consumer_layout_ui_ctx_I.generated.js'
export interface consumer_layout_ui_Ctx extends consumer_layout_ui_ctx_I,
	ui_Ctx,
	layout_ui_Ctx,
	search_menu_common_Ctx {
}
