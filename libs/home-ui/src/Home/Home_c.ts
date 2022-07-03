import { I } from '@ctx-core/combinators'
import { has_dom } from '@ctx-core/dom'
import { page_query$_b, page_query$_T } from '@ctx-core/sapper'
import { Writable$, writable$, subscribe_wait_timeout } from '@ctx-core/store'
import { query_str_ } from '@ctx-core/uri'
import type { CityCtx } from '@menus/address'
import { init_google_maps_promise_b } from '@menus/app'
import { consumer_http_client_b, fetch_search_menus_menu_b } from '@menus/consumer-http'
import type { SelectStrDishSearchEvent } from '@menus/consumer-layout-ui'
import { userAddress$_b, userAddress_text$_b, validate_userAddress_b } from '@menus/consumer-user-address'
import { SCREEN_MD_MIN } from '@menus/css'
import { platform_settings$_b } from '@menus/http'
import { toggle_mobile_menu_b } from '@menus/layout-ui'
import { DEFAULT_MAP_OPTIONS } from '@menus/maps'
import { notyf_error_b } from '@menus/notyf'
import { navigating_goto_b } from '@menus/page'
import { Restaurant } from '@menus/restaurant'
import { SearchMenuRequestQuery, PopularDish } from '@menus/search-menu'
import { SERVICE_TYPE_DELIVERY, ServiceTypeId } from '@menus/service-type'
import { BaseController, LocationAutocomplete_I } from '@menus/shared-ui'
import { deep_clone, log, url_slug_ } from '@menus/util'
import { REST_MARKER_ZINDEX, MAP_SEARCH_VIEW, timeout_ms, } from '@menus/web-config'
import type { home_ui_Ctx } from '../home_ui_Ctx.js'
import { load_home_data_b } from '../load_home_data_b.js'
export const REST_ICON = '/assets/img/ro/restaurant-map-gray.svg'
const Controller_name = 'Home_c'
export class Home_c extends BaseController<home_ui_Ctx> {
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly fetch_search_menus_menu = fetch_search_menus_menu_b(this.ctx)
	readonly init_google_maps_promise = init_google_maps_promise_b(this.ctx)
	readonly load_home_data = load_home_data_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly page_query$:page_query$_T = page_query$_b(this.ctx)
	readonly platform_settings$ = platform_settings$_b(this.ctx)
	readonly toggle_mobile_menu = toggle_mobile_menu_b(this.ctx)
	readonly userAddress$ = userAddress$_b(this.ctx)
	readonly userAddress_text$ = userAddress_text$_b(this.ctx)
	readonly validate_userAddress = validate_userAddress_b(this.ctx)
	readonly cities$:Writable$<CityCtx[]> = writable$(undefined)
	readonly color_white$:Writable$<boolean> = writable$(false)
	readonly dish$:Writable$<string> = writable$('')
	readonly home_page_map$:Writable$<HTMLDivElement> = writable$(undefined)
	readonly locationAutocomplete$:Writable$<LocationAutocomplete_I> = writable$(undefined)
	readonly popular_dishes$:Writable$<PopularDish[]> = writable$(undefined)
	readonly popular_dishes_container$:Writable$<HTMLDivElement> = writable$(null)
	readonly popular_dish_divs$:Writable$<HTMLDivElement[]> = writable$(null)
	readonly restaurants$:Writable$<Restaurant[]> = writable$([])
	readonly search_regex$:Writable$<RegExp> = writable$(/.*/)
	readonly selected_popular_dish_index$:Writable$<undefined|number> = writable$(undefined)
	readonly selected_tab$:Writable$<string> = writable$('dish')
	readonly value$:Writable$<string> = writable$('')
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.refresh_color_white()
		await this.load_data()
		if (has_dom) {
			await subscribe_wait_timeout(this.home_page_map$, I, timeout_ms)
			await this.init_map()
		}
	};
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		const { cities, popular_dishes } = await this.load_home_data()
		this.cities$.$ = cities
		this.popular_dishes$.$ = popular_dishes
	}
	get searchPopularDishes() {
		const search_regex = this.search_regex$.$
		return this.popular_dishes$.$.filter(
			popularDish=>search_regex.test(popularDish.Name)
		)
	}
	readonly init_userAddress = (user_clicked:boolean)=>{
		return this.locationAutocomplete$.$.init_userAddress(user_clicked)
	}
	readonly init_map = async ()=>{
		await this.init_google_maps_promise
		const map_options = deep_clone(DEFAULT_MAP_OPTIONS)
		map_options.draggable = false
		map_options.center = { lat: 34.052235, lng: -118.243683 }
		const map = new google.maps.Map(this.home_page_map$.$, map_options)
		const request = new SearchMenuRequestQuery()
		request.menuType = ServiceTypeId[SERVICE_TYPE_DELIVERY]
		const payload = (
			await this.fetch_search_menus_menu(request)
		)
		this.restaurants$.$ = payload.Data.map(
			attributes=>new Restaurant(attributes)
		)
		for (const restaurant of this.restaurants$.$) {
			new google.maps.Marker({
				position: restaurant.LatLngLiteral,
				map,
				icon: REST_ICON,
				zIndex: REST_MARKER_ZINDEX,
			})
		}
		log(this.ctx, Controller_name, 'search_menus_menu()', payload)
	}
	readonly login = async (evt)=>{
		evt.preventDefault()
		this.navigating_goto('/login').then()
		this.toggle_mobile_menu()
	}
	readonly refresh_color_white = ()=>{
		this.color_white$.$ = has_dom && window.innerWidth < SCREEN_MD_MIN
	}
	readonly select_dish = async (dish:string)=>{
		this.dish$.$ =
			this.selected_popular_dish_index$.$ == undefined
			? dish
			: this.searchPopularDishes[this.selected_popular_dish_index$.$].Name
		if (this.userAddress$.$) {
			await this.search()
		} else {
			this.selected_tab$.$ = 'address'
			await subscribe_wait_timeout(this.locationAutocomplete$, I, timeout_ms)
			this.locationAutocomplete$.$.focus()
		}
	}
	readonly clear_dish = ()=>{
		this.dish$.$ = ''
	}
	readonly clear_locationAutocomplete = ()=>{
		this.locationAutocomplete$.$.clear()
	}
	readonly url_slug_ = (value:string):string=>{
		return url_slug_(value)
	}
	readonly search = async ()=>{
		if (this.userAddress$.$) {
			await this._search()
		} else {
			setTimeout(()=>{
				if (!this.userAddress$.$) {
					this.notyf_error('You need to provide a location')
				}
			}, 500)
		}
	}
	readonly onUserAddressChanged = async ()=>{
		if (this.userAddress$.$) {
			await this.search()
		}
	}
	readonly onClickPopularDish = async (event:Event, dish:string)=>{
		event.preventDefault()
		await this.select_dish(dish)
	}
	readonly onselect_SearchParams = async (_evt:SelectStrDishSearchEvent)=>{
		await this.select_dish(this.value$.$)
	}
	readonly onescape_SearchParams = (_evt:KeyboardEvent)=>{
		this.selected_popular_dish_index$.$ = null
		this.popular_dishes_container$.$.scrollTop = 0
	}
	readonly onarrowUp_SearchParams = (_evt:KeyboardEvent)=>{
		this.selected_popular_dish_index$.$ =
			this.selected_popular_dish_index$.$
			? this.selected_popular_dish_index$.$ - 1
			: this.searchPopularDishes.length - 1
		this.popular_dishes_container$.$.scrollTop =
			this.popular_dish_divs$.$[this.selected_popular_dish_index$.$].offsetTop - 100
	}
	readonly onarrowDown_SearchParams = (_evt:KeyboardEvent)=>{
		this.selected_popular_dish_index$.$ =
			(
				this.selected_popular_dish_index$.$ == null
				|| (this.selected_popular_dish_index$.$ >= (this.searchPopularDishes.length - 1))
			)
			? 0
			: this.selected_popular_dish_index$.$ + 1
		this.popular_dishes_container$.$.scrollTop =
			this.popular_dish_divs$[this.selected_popular_dish_index$.$].offsetTop - 100
	}
	private _search = async ()=>{
		log(this.ctx, Controller_name, 'search', this.userAddress$.$)
		await this.validate_userAddress(this.userAddress$.$)
		// Navigating to search component page with queryParams
		await this.navigating_goto([
			'/search',
			query_str_({
				search_keywords: this.dish$.$,
				serviceType: this.page_query$.$.serviceType,
				view: MAP_SEARCH_VIEW,
			})
		])
	}
}
