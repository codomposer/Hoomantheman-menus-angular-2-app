import { Writable$, writable$ } from '@ctx-core/store'
import type { BaseRestaurantCard } from '@menus/restaurant'
import { SearchMenuitem_I } from '@menus/search-menu-common'
import { BaseController } from '@menus/shared-ui-lib'
import type { consumer_search_ui_Ctx } from '../consumer_search_ui_Ctx.js'
export class RestaurantCard_c extends BaseController<consumer_search_ui_Ctx> {
	readonly index$:Writable$<number> = writable$(null)
	readonly restaurant_card$:Writable$<BaseRestaurantCard | SearchMenuitem_I> = writable$(null)
	readonly onMouseOut = (domEvent:Event)=>{
		this.dispatch('mouseout', {
			domEvent,
			restaurant_card: this.restaurant_card$.$,
			index: this.index$.$
		})
	}
	readonly onMouseOver = (domEvent:Event)=>{
		this.dispatch('mouseover', {
			domEvent,
			restaurant_card: this.restaurant_card$.$,
			index: this.index$.$
		})
	}
	readonly onclose = (evt:Event)=>{
		this.dispatch('close', evt)
	}
}
