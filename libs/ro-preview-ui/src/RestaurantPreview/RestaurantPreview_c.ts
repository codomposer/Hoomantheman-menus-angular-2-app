import { tup } from '@ctx-core/array'
import { derived$, Readable$, writable$, Writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { params_fireFlyID$_b, params_other_fireFlyID$_b } from '@menus/page'
import { Path } from '@menus/route'
import {
	API_PREVIEW_preview_payload_T, ro_httpClient_b, RoRequestQuery, success_API_RESTAURANT_info_payload_T
} from '@menus/ro-http'
import { url_friendly_names$_b } from '@menus/breadcrumb'
import { goto_b, goto_T } from '@menus/ui'
import { RoRestaurant_I } from '@menus/ro-restaurant'
import type { RestaurantMenuPreview_change_data_evt_T } from '../RestaurantMenuPreview'
import type { ro_preview_ui_Ctx } from '../ro_preview_ui_Ctx.js'
const Controller_name = 'RestaurantPreview_c'
export class RestaurantPreview_c extends BaseController<ro_preview_ui_Ctx> {
	readonly goto:goto_T = goto_b(this.ctx)
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly params_other_fireFlyID$ = params_other_fireFlyID$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly url_friendly_names = url_friendly_names$_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly ro_restaurant$:Writable$<RoRestaurant_I> = writable$(null)
	readonly other_data$:Writable$<API_PREVIEW_preview_payload_T> = writable$(null)
	readonly is_loaded$:Readable$<boolean> = derived$(tup(this.busy$, this.ro_restaurant$),//region
		([busy, ro_restaurant])=>{
			return !!(!busy && ro_restaurant)
		}
	)//endregion
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
			const API_RESTAURANT_info_payload =
				await this.API_RESTAURANT_info(this.params_fireFlyID$.$) as success_API_RESTAURANT_info_payload_T
			this.ro_restaurant$.$ = API_RESTAURANT_info_payload.Data
			const $url_friendly_names = this.url_friendly_names.$
			$url_friendly_names.set(
				`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}/${this.params_fireFlyID$.$}`,
				this.ro_restaurant$.$.Name
			)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly API_RESTAURANT_info = (params_fireFlyID)=>{
		const requestData = new RoRequestQuery()
		RoRequestQuery.fill_fireFlyID(requestData, params_fireFlyID)
		return this.ro_httpClient.API_RESTAURANT_info(requestData)
	}
	readonly onchange_other_data = (evt:RestaurantMenuPreview_change_data_evt_T)=>{
		this.other_data$.$ = evt.detail
		const $url_friendly_names = this.url_friendly_names.$
		$url_friendly_names.set(
			`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}/${this.params_fireFlyID$.$}/${Path.RO.PREVIEW}/${this.params_other_fireFlyID$.$}`,
			this.other_data$.$.RestName
		)
	}
}
