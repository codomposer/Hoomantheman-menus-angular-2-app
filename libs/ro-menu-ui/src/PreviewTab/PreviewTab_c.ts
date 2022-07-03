import { I } from '@ctx-core/combinators'
import { noinit_subscribe, subscribe_wait_for_timeout, writable$, Writable$ } from '@ctx-core/store'
import { params_fireFlyID$_b } from '@menus/page'
import { API_PREVIEW_preview_b, API_PREVIEW_preview_payload_T, ro_httpClient_b, RoRequestQuery } from '@menus/ro-http'
import type { RoMenuitemHeading_I, RoPreviewMasterheading_I } from '@menus/ro-shared-models'
import { BaseController } from '@menus/shared-ui-lib'
import { log } from '@menus/util'
import { timeout_ms } from '@menus/web-config'
import type { MenuitemPreviewModal_I } from '../MenuitemPreviewModal/index.js'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
const Controller_name = 'PreviewTab_c'
export class PreviewTab_c extends BaseController<ro_menu_ui_Ctx> {
	readonly API_PREVIEW_preview = API_PREVIEW_preview_b(this.ctx)
	readonly API_PREVIEW_preview_payload$:Writable$<API_PREVIEW_preview_payload_T> = writable$(null)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly MenuitemPreviewModal_i$:Writable$<MenuitemPreviewModal_I> = writable$(null)
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly ro_preview_masterheadings$:Writable$<RoPreviewMasterheading_I[]> = writable$(null)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.unsubscribers.push(
			noinit_subscribe(this.API_PREVIEW_preview_payload$, API_PREVIEW_preview_payload=>
				this.ro_preview_masterheadings$.$ = API_PREVIEW_preview_payload?.MasterHeading
			)
		)
		this.load_data().then()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		this.busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			const params_fireFlyID = await subscribe_wait_for_timeout(this.params_fireFlyID$, I, timeout_ms)
			requestData.ff = params_fireFlyID
			const API_PREVIEW_preview_payload = await this.API_PREVIEW_preview(requestData)
			this.API_PREVIEW_preview_payload$.$ = API_PREVIEW_preview_payload
			log(this.ctx, Controller_name, 'API_PREVIEW_preview', API_PREVIEW_preview_payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly open_MenuitemPreviewModal_i = async (ro_menuitem_heading:RoMenuitemHeading_I)=>{
		if (ro_menuitem_heading.HaveOption === 1) {
			await this.MenuitemPreviewModal_i$.$.open({
				fireFlyID: this.params_fireFlyID$.$,
				ro_menuitem_heading,
			})
		}
	}
}
