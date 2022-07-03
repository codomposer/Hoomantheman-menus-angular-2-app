import type { ui_Ctx } from '@menus/ui'
import type { filters_common_Ctx } from '@menus/filters-common'
import type { notyf_Ctx } from '@menus/notyf'
import type { search_menu_Ctx } from '@menus/search-menu'
export interface search_ui_Ctx extends ui_Ctx, filters_common_Ctx, notyf_Ctx, search_menu_Ctx {}
