import { tup } from '@ctx-core/array'
import { derived$, Readable$, writable$, Writable$ } from '@ctx-core/store'
import { platform_settings$_b } from '@menus/http'
import type { Menuitem } from '@menus/consumer-menu'
import { BaseController } from '@menus/shared-ui-lib'
import type { consumer_search_ui_Ctx } from '../consumer_search_ui_Ctx.js'
export class Menuitem_c extends BaseController<consumer_search_ui_Ctx> {
	readonly platform_settings = platform_settings$_b(this.ctx)
	readonly index:Writable$<number> = writable$(null)
	readonly menuitem:Writable$<Menuitem> = writable$(null)
	readonly itemTrending:Readable$<boolean> = derived$(tup(this.platform_settings, this.menuitem),//region
		([$platform_settings, $menuitem])=>{
			return (
				$platform_settings?.Enable_Popular_Ribbon
				&& $menuitem?.PopularLevel === 1
			)
		})//endregion
	readonly onmouseover = (domEvent:Event)=>{
		this.dispatch('mouseover', {
			domEvent,
			menuitem: this.menuitem.$,
			index: this.index.$,
		})
	}
	readonly onmouseout = (domEvent:Event)=>{
		this.dispatch('mouseout', {
			domEvent,
			menuitem: this.menuitem.$,
			index: this.index.$,
		})
	}
	readonly onclose = (evt:Event)=>{
		this.dispatch('close', evt)
	}
	readonly onclick_more_dishes = (_evt:MouseEvent)=>{
		this.dispatch('showMoreDishes', _evt)
	}
}
