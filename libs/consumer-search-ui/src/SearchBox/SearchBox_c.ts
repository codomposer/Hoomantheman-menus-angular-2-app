import { I } from '@ctx-core/combinators'
import { noinit_subscribe, subscribe_wait_timeout, Writable$, writable$ } from '@ctx-core/store'
import { consumer_http_client_b } from '@menus/consumer-http'
import { AutoSuggestItem, autoSuggestList$_b, autoSuggestList$_T } from '@menus/consumer-user'
import { search_keyword_a$_b } from '@menus/filters-common'
import { assign_to_query_goto_b } from '@menus/page'
import { SearchMenuRequestQuery } from '@menus/search-menu-common'
import { BaseController } from '@menus/shared-ui-lib'
import { assign_to_query_str__b, navigating_goto_b, query_keywords$_b } from '@menus/page'
import { query_str_ } from '@ctx-core/uri'
import { userAddress$_b, userAddress_coordinate_ } from '@menus/consumer-user-address'
import { ServiceTypeId } from '@menus/service-type-common'
import { restaurant_url_, menuitem_restaurant_url_data_ } from '@menus/route'
import { log } from '@menus/util'
import { serviceType$_b } from '@menus/service-type'
import { timeout_ms } from '@menus/web-config'
import { platform_settings$_b } from '@menus/http'
import type { consumer_search_ui_Ctx } from '../consumer_search_ui_Ctx.js'
import { LatLng_ } from '@menus/geolocatable'
const Controller_name = 'SearchBox_c'

export enum SearchKeywordType {
	KEYWORD_NONE = -1,
	KEYWORD_TYPE_MENU_ITEM =  0,
	KEYWORD_TYPE_CUISINE =  1,
	KEYWORD_TYPE_DISH = 2,
	KEYWORD_TYPE_RESTAURANT = 3
}

export class SearchBox_c extends BaseController<consumer_search_ui_Ctx> {
	readonly assign_to_query_str_ = assign_to_query_str__b(this.ctx)
	readonly serviceType$ = serviceType$_b(this.ctx)
	readonly platform_settings$ = platform_settings$_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly assign_to_query_goto = assign_to_query_goto_b(this.ctx)
	readonly query_keywords$ = query_keywords$_b(this.ctx)
	readonly userAddress$ = userAddress$_b(this.ctx)
	readonly autoSuggestList$:autoSuggestList$_T = autoSuggestList$_b(this.ctx)
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly search_keyword_a$ = search_keyword_a$_b(this.ctx)
	readonly autoSuggest_busy$:Writable$<boolean> = writable$(false)
	readonly autoSuggest_items:Writable$<AutoSuggestItem[]> = writable$([])
	readonly cuisine_autoSuggest_items$:Writable$<AutoSuggestItem[]> = writable$([])
	readonly dish_autoSuggest_items$:Writable$<AutoSuggestItem[]> = writable$([])
	readonly menuitems_autoSuggest_items$:Writable$<AutoSuggestItem[]> = writable$([])
	readonly rest_autoSuggest_items$:Writable$<AutoSuggestItem[]> = writable$([])
	readonly selected_autoSuggest_index:Writable$<number> = writable$(null)
	readonly selected_autoSuggest_item$:Writable$<AutoSuggestItem> = writable$(null)
	readonly show_autoSuggest$:Writable$<boolean> = writable$(false)
	readonly value$:Writable$<string> = writable$(this.query_keywords$.$)
	async onMount() {
		await super.onMount()
		this.unsubscribers.push(
			// this.search_keyword_a$.subscribe((search_text_a:string[])=>this.value$.$ = (search_text_a || []).join('|')),
			noinit_subscribe(this.value$, this.onchange_value),
		)
	};
	readonly onclick_autoSuggestItem = async (item:AutoSuggestItem, keywordType: SearchKeywordType)=>{
		// handle keyword click accordingly 
		if(this.platform_settings$.$.IsMultiRestaurant || this.platform_settings$.$.IsMarketPlace) {
			if (keywordType === SearchKeywordType.KEYWORD_NONE) {
				await this.navigating_goto([
					'/search'
				])
			} else if (keywordType === SearchKeywordType.KEYWORD_TYPE_DISH || keywordType === SearchKeywordType.KEYWORD_TYPE_MENU_ITEM) {
				await this.navigating_goto([
					'/menu',
					query_str_({
						keywords: item.Name,
					})
				])
			} else {
				await this.navigating_goto([
					'/search',
					query_str_({
						keywords: item.Name,
					})
				])
			}
		} else {
			this.autoSuggest_busy$.$ = true
			const requestData = new SearchMenuRequestQuery()
			requestData.mid = item.Id;
			requestData.restaurantid = 0;
			requestData.menuType = ServiceTypeId[this.serviceType$.$];
			if(this.userAddress$.$) {
				requestData.coordinate = userAddress_coordinate_(LatLng_(this.userAddress$.$))
			}
			const payload = await this.consumer_http_client.search_menus_menuitems(requestData)
			this.autoSuggest_busy$.$ = false

			if(payload.Data && payload.Data.length > 0) {
				await this.navigating_goto([
					restaurant_url_(
						menuitem_restaurant_url_data_(payload.Data[0], this.serviceType$.$)
					),
					query_str_({
						menuitemid: `${item.Id}`,
					})
				])
			}
		}

		log(this.ctx, Controller_name, 'onclick_autoSuggestItem()', item)
	}
	readonly emitFiltersChanged = async (keyword?:string, keywordType?:string)=>{
		if (keyword) {
			// If keyword type is unknown
			if (!keywordType) {
				this.autoSuggest_busy$.$ = true
				const requestData = new SearchMenuRequestQuery()
				const payload = await this.consumer_http_client.search_menus_wordfilter(requestData)
				this.autoSuggest_busy$.$ = false
				log(this.ctx, Controller_name, 'search_menus_wordfilter payload', payload)
			}
		}
	}
	readonly focus_SearchParams = (focus:boolean)=>{
		this.show_autoSuggest$.$ = focus
		this.selected_autoSuggest_index.$ = -1
		this.selected_autoSuggest_item$.$ = null
		log(this.ctx, Controller_name, 'focus_SearchParams()', focus)

		if(focus) {
			this.onchange_value(this.value$.$);
		}
	}
	readonly onkeydown_ArrowUp = (_keyboardEvent:KeyboardEvent)=>{
		if (this.selected_autoSuggest_index.$ >= 0) {
			this.selected_autoSuggest_index.$ -= 1
		} else {
			this.selected_autoSuggest_index.$ = this.autoSuggest_items.$.length - 1
		}
		this.update_selected_autoSuggest_item()
	}
	readonly onkeydown_ArrowDown = (_keyboardEvent:KeyboardEvent)=>{
		if (this.selected_autoSuggest_index.$ < (this.autoSuggest_items.$.length - 1)) {
			this.selected_autoSuggest_index.$ += 1
		} else {
			this.selected_autoSuggest_index.$ = -1
		}
		this.update_selected_autoSuggest_item()
	}
	readonly onchange_value = async (value:string)=>{
		await subscribe_wait_timeout(this.autoSuggestList$, I, timeout_ms)
		const autoSuggestList = this.autoSuggestList$.$
		console.debug('onchange_value|debug|1', {
			value,
		})
		const lowerCase_value = value.toLowerCase()
		// Menu Items
		const menuitems = autoSuggestList.MenuItems || []
		this.menuitems_autoSuggest_items$.$ = menuitems.filter((item)=>{
			return item.Name.toLowerCase().indexOf(lowerCase_value) > -1
		})
		
		if(this.platform_settings$.$.IsMultiRestaurant || this.platform_settings$.$.IsMarketPlace) {
			this.menuitems_autoSuggest_items$.$ = this.menuitems_autoSuggest_items$.$.slice(0, 3)

			// Dishes
			const dishList = autoSuggestList.Dish || []
			this.dish_autoSuggest_items$.$ = dishList.filter(item=>{
				return item.Name.toLowerCase().indexOf(lowerCase_value) > -1
			})
			this.dish_autoSuggest_items$.$ = this.dish_autoSuggest_items$.$.slice(0, 3)
			// Cuisines
			const cuisineList = autoSuggestList.Cuisine || []
			this.cuisine_autoSuggest_items$.$ = cuisineList.filter(item=>{
				return item.Name.toLowerCase().indexOf(lowerCase_value) > -1
			})
			this.cuisine_autoSuggest_items$.$ = this.cuisine_autoSuggest_items$.$.slice(0, 3)
			// Restaurants
			const restaurant_a = autoSuggestList.Restaurant || []
			this.rest_autoSuggest_items$.$ = restaurant_a.filter(item=>{
				return item.Name.toLowerCase().indexOf(lowerCase_value) > -1
			})
			this.rest_autoSuggest_items$.$ = this.rest_autoSuggest_items$.$.slice(0, 3)
			this.autoSuggest_items.$ =
				[].concat(
					this.menuitems_autoSuggest_items$.$,
					this.dish_autoSuggest_items$.$,
					this.cuisine_autoSuggest_items$.$,
					this.rest_autoSuggest_items$.$
				)
		} else {
			this.menuitems_autoSuggest_items$.$ = this.menuitems_autoSuggest_items$.$.slice(0, 9)

			this.autoSuggest_items.$ =
				[].concat(
					this.menuitems_autoSuggest_items$.$,
				)
		}
	}
	readonly onselect_SearchParams = async ()=>{
		const value = this.value$.$

		log(this.ctx, Controller_name, 'onselect_SearchParams()', value)
		try {
			if(this.platform_settings$.$.IsMultiRestaurant || this.platform_settings$.$.IsMarketPlace) {
				if(!value) {
					this.onclick_autoSuggestItem(null, SearchKeywordType.KEYWORD_NONE)
				} else {
					// If keyword type is unknown
					this.autoSuggest_busy$.$ = true
					const requestData = new SearchMenuRequestQuery()
					requestData.keywords = value
					const payload = await this.consumer_http_client.search_menus_wordfilter(requestData)
					this.autoSuggest_busy$.$ = false

					if(payload.WordType && payload.WordType.length > 0) {
						this.onclick_autoSuggestItem({ Id: null, Name: requestData.keywords }, payload.WordType[0].KeywordType)
					}

					log(this.ctx, Controller_name, 'search_menus_wordfilter payload', payload)
				}
			}
		} finally {
			this.focus_SearchParams(false)
		}
	}
	readonly update_selected_autoSuggest_item = ()=>{
		if (~this.selected_autoSuggest_index.$) {
			this.selected_autoSuggest_item$.$ =
				this.autoSuggest_items.$[this.selected_autoSuggest_index.$]
		} else {
			this.selected_autoSuggest_item$.$ = null
		}
	}
}
