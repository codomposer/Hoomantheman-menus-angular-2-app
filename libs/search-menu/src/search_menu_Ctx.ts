import type { consumer_http_Ctx } from '@menus/consumer-http'
import type { filters_common_Ctx } from '@menus/filters-common'
import type { maps_Ctx } from '@menus/maps'
import type { search_menu_common_Ctx } from '@menus/search-menu-common'
import type { search_menu_ctx_I } from './search_menu_ctx_I.generated.js'
export interface search_menu_Ctx extends search_menu_ctx_I,
	consumer_http_Ctx, filters_common_Ctx, maps_Ctx, search_menu_common_Ctx {}
