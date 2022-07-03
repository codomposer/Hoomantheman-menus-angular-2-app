import { page_query$_b, page_query$_T } from '@ctx-core/sapper'
import { platform_settings$_b } from '@menus/http'
import { assign_to_query_str__b, navigating_goto_b } from '@menus/page'
import type { SearchMenuitem_I } from '@menus/search-menu-common'
import { BaseController } from '@menus/shared-ui-lib'
import { MAP_SEARCH_VIEW } from '@menus/web-config'
import type { consumer_search_ui_Ctx } from '../consumer_search_ui_Ctx.js'
export class RestGrid_c extends BaseController<consumer_search_ui_Ctx> {
	items:SearchMenuitem_I[]
	readonly assign_to_query_str_ = assign_to_query_str__b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly page_query$:page_query$_T = page_query$_b(this.ctx)
	readonly platform_settings = platform_settings$_b(this.ctx)
	readonly open_map_search_view = async ()=>{
		await this.navigating_goto([
			'/search',
			this.assign_to_query_str_({
				search_view: MAP_SEARCH_VIEW,
			})
		])
	}
	on_loadMore = (evt) => {
		this.dispatch('loadMore', evt)
	}
}
