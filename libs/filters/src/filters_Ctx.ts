import type { filters_common_Ctx } from '@menus/filters-common'
import type { search_menu_common_Ctx } from '@menus/search-menu-common'
import type { filters_ctx_I } from './filters_ctx_I.generated.js'
export interface filters_Ctx extends filters_ctx_I,
	filters_common_Ctx, search_menu_common_Ctx {
}
