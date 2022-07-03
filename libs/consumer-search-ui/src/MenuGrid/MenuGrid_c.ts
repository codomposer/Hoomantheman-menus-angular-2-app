import { clone } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import { page_query$_b, page_query$_T } from '@ctx-core/sapper'
import { search_menus_menu_requestData_, fetch_search_menus_menuitems_b } from '@menus/consumer-http'
import type { Menuitem, Menuitem_I } from '@menus/consumer-menu'
import { page_data$_b, navigating_goto_b } from '@menus/page'
import { Enable_Map_View$_b } from '@menus/platform-settings'
import { restaurant_url_, menuitem_restaurant_url_data_ } from '@menus/route'
import { search_menus_menuitems_requestQuery$_b } from '@menus/search-menu'
import { serviceType$_b } from '@menus/service-type'
import { BaseController } from '@menus/shared-ui-lib'
import { enableBodyScroll, log } from '@menus/util'
import type { consumer_search_ui_Ctx } from '../consumer_search_ui_Ctx.js'
const Controller_name = 'MenuGrid_c'
export class MenuGrid_c extends BaseController<consumer_search_ui_Ctx> {
	readonly Enable_Map_View$ = Enable_Map_View$_b(this.ctx)
	readonly fetch_search_menus_menuitems = fetch_search_menus_menuitems_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly page_query$:page_query$_T = page_query$_b(this.ctx)
	readonly page_data$ = page_data$_b(this.ctx)
	readonly search_menus_menuitems_requestQuery$ = search_menus_menuitems_requestQuery$_b(this.ctx)
	readonly serviceType$ = serviceType$_b(this.ctx)
	readonly selected_menuitem$:Writable$<Menuitem_I> = writable$(null)
	readonly more_dishes_show$:Writable$<boolean> = writable$(false)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	};
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly on_loadMore = (evt)=>{
		this.dispatch('loadMore', evt)
	}
	readonly set_ShowMoreDishes = async (menuitem:Menuitem)=>{
		if (menuitem) {
			enableBodyScroll(false)
			this.selected_menuitem$.$ = menuitem
			const requestData = search_menus_menu_requestData_(clone(this.search_menus_menuitems_requestQuery$.$))
			requestData.restaurantid = this.selected_menuitem$.$.RestaurantID
			requestData.Menus_SourceID = this.selected_menuitem$.$.Menus_SourceID
			requestData.termsinclude = ''
			const payload = await this.fetch_search_menus_menuitems(requestData)
			this.selected_menuitem$.$.sub_menuitems = payload.Data
			this.more_dishes_show$.$ = true
		} else {
			enableBodyScroll(true)
			this.more_dishes_show$.$ = false
			this.selected_menuitem$.$ = null
		}
		this.dispatch('selected_menuitem_changed', {
			selected_menuitem: this.selected_menuitem$.$
		})
	}
	readonly view_restaurant = async (menuitem:Menuitem, navigate:boolean)=>{
		log(this.ctx, Controller_name, 'view_restaurant', menuitem)
		this.page_data$.$ = { menuitem }
		if (navigate) {
			await this.navigating_goto(
				restaurant_url_(
					menuitem_restaurant_url_data_(menuitem, this.serviceType$.$)
				)
			)
		}
	}
	readonly onclick_outside_ShowMoreDishes = async (event:MouseEvent)=>{
		log(this.ctx, Controller_name, 'onclick_outside_ShowMoreDishes', event)
		await this.set_ShowMoreDishes(null)
	}
}
