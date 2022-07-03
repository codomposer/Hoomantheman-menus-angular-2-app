import type { filters_common_Ctx } from '@menus/filters-common'
import type { maps_Ctx } from '@menus/maps'
import type { notyf_Ctx } from '@menus/notyf'
import type { page_Ctx } from '@menus/page'
import type { ui_Ctx } from '@menus/ui'
import type { consumer_search_ui_ctx_I } from './consumer_search_ui_ctx_I.generated.js'
export interface consumer_search_ui_Ctx extends consumer_search_ui_ctx_I,
	filters_common_Ctx, maps_Ctx, notyf_Ctx, page_Ctx, ui_Ctx {
}
