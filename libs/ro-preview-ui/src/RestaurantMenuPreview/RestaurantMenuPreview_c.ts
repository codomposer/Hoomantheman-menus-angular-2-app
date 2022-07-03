import { writable$, Writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { API_PREVIEW_preview_b, API_PREVIEW_preview_payload_T, ro_httpClient_b, RoRequestQuery } from '@menus/ro-http'
import { params_fireFlyID$_b } from '@menus/page'
import type { MenuitemPreviewModal_I } from '@menus/ro-menu-ui'
import type { RoMenuitemHeading_I } from '@menus/ro-shared-models'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import type { ro_preview_ui_Ctx } from '../ro_preview_ui_Ctx.js'
const Controller_name = 'RestaurantMenuPreview_c'
export class RestaurantMenuPreview_c extends BaseController<ro_preview_ui_Ctx> {
	readonly API_PREVIEW_preview = API_PREVIEW_preview_b(this.ctx)
	readonly API_PREVIEW_preview_payload$:refresh_writable_T<API_PREVIEW_preview_payload_T> =
		refresh_writable_<API_PREVIEW_preview_payload_T>(null)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly MenuitemPreviewModal_i$:Writable$<MenuitemPreviewModal_I> = writable$(null)
	readonly params_fireFlyID = params_fireFlyID$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		await this.load_data()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		this.busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			requestData.ff = this.params_fireFlyID.$
			const API_PREVIEW_preview_payload = await this.API_PREVIEW_preview(requestData)
			this.API_PREVIEW_preview_payload$.$ = API_PREVIEW_preview_payload
			this.dispatch('change_data', API_PREVIEW_preview_payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly open_MenuitemPreviewModal_i = async (ro_menuitem_heading:RoMenuitemHeading_I)=>{
		if (ro_menuitem_heading.HaveOption === 1) {
			await this.MenuitemPreviewModal_i$.$.open({
				fireFlyID: this.params_fireFlyID.$,
				ro_menuitem_heading,
			})
		}
	}
}
