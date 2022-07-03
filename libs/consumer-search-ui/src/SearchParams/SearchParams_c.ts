import { BaseController } from '@menus/shared-ui-lib'
import type { consumer_search_ui_Ctx } from '../consumer_search_ui_Ctx.js'
import { platform_settings$_b } from '@menus/http'
export class SearchParams_c extends BaseController<consumer_search_ui_Ctx> {
	readonly platform_settings$ = platform_settings$_b(this.ctx)

	readonly onkeydown = (evt:KeyboardEvent)=>{
		this.dispatch('keydown', evt)
		this.dispatch(`keydown:${evt.code}`, evt)
	}
	readonly onkeyup = (evt:KeyboardEvent)=>{
		this.dispatch('keyup', evt)
	}
	readonly onclick_button = (evt:Event)=>{
		if(this.platform_settings$.$.IsMultiRestaurant || this.platform_settings$.$.IsMarketPlace) {
			this.dispatch('select', evt)
		}
	}
}
