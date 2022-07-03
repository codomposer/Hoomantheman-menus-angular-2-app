import { query_str_ } from '@ctx-core/uri'
import { is_mobile_menu_open$_b } from '@menus/layout-ui'
import { navigating_goto_b } from '@menus/page'
import { BaseController } from '@menus/shared-ui-lib'
import type { consumer_layout_ui_Ctx } from '../consumer_layout_ui_Ctx.js'
export class CrMainDashboard_c extends BaseController<consumer_layout_ui_Ctx> {
	readonly is_mobile_menu_open$ = is_mobile_menu_open$_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	navigate = async (url: string)=>{
		await this.navigating_goto([
			url,
			query_str_({ returnUrl: `${window.location.pathname}${window.location.search}` })
		])
		this.is_mobile_menu_open$.set(false)
	}
}
