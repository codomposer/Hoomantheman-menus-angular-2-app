import { neql_ } from '@ctx-core/function'
import { clone } from '@ctx-core/object'
import { I } from '@ctx-core/combinators'
import { has_dom } from '@ctx-core/dom'
import { derived$, Readable$, subscribe_wait_timeout, Writable$, writable$ } from '@ctx-core/store'
import { fork_map_icon_, list_view_icon_, BaseController, is_between_UTC_time } from '@menus/shared-ui-lib'
import type { SearchMenuitem_I } from '@menus/search-menu-common'
import type { Heading_I, Masterheading } from '@menus/consumer-menu'
import { log } from '@menus/util'
import { HEADER, timeout_ms } from '@menus/web-config'
import { platform_settings$_b } from '@menus/http'
import { Color_RestMapIcon$_b, isPlatform$_b, PlatformSettings } from '@menus/platform-settings'
import type { isDeliverable$_T } from '@menus/service-type'
import { has_userAddress$_b } from '@menus/consumer-user-address'
import { navigating_goto_b } from '@menus/page'
import { MarkerWithPosition_, DEFAULT_MAP_OPTIONS } from '@menus/maps'
import { init_google_maps_promise_b } from '@menus/app'
import { notyf_error_b } from '@menus/notyf'
import type { MapRouteModal_I } from '@menus/consumer-user-ui'
import { LatLngLiteral_ } from '@menus/geolocatable'
import { restaurant_frame$_b, RestaurantFrame_I } from '@menus/restaurant-frame'
import { selected_masterheading$_b } from '../selected_masterheading$_b.js'
import { selected_menuitem$_b } from '../selected_menuitem$_b.js'
import { heading_elements$_b } from '../heading_elements$_b.js'
import { restaurant_busy$_b, restaurant_busy$_T } from '../restaurant_busy$_b.js'
import { Restaurant_ServiceTypeNav_ul$_b } from '../Restaurant_ServiceTypeNav'
import type { restaurant_ui_Ctx } from '../restaurant_ui_Ctx.js'
const Controller_name = 'Restaurant_Menuitems_c'
export class Restaurant_Menuitems_c extends BaseController<restaurant_ui_Ctx> {
	readonly restaurant_busy$:restaurant_busy$_T = restaurant_busy$_b(this.ctx)
	readonly Color_RestMapIcon$ = Color_RestMapIcon$_b(this.ctx)
	readonly has_userAddress$ = has_userAddress$_b(this.ctx)
	readonly init_google_maps_promise = init_google_maps_promise_b(this.ctx)
	readonly heading_elements$ = heading_elements$_b(this.ctx)
	readonly isPlatform$ = isPlatform$_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly platform_settings$ = platform_settings$_b(this.ctx)
	readonly restaurant_frame$ = restaurant_frame$_b(this.ctx)
	readonly Restaurant_ServiceTypeNav_ul$ = Restaurant_ServiceTypeNav_ul$_b(this.ctx)
	readonly selected_masterheading$ = selected_masterheading$_b(this.ctx)
	readonly selected_menuitem$ = selected_menuitem$_b(this.ctx)
	readonly is_masterheadings_tab_section_fixed$:Writable$<boolean> = writable$(false)
	readonly is_masterheadings_tab_section_mobile_fixed$:Writable$<boolean> = writable$(false)
	readonly is_rest_heads_menu_fixed$:Writable$<boolean> = writable$(false)
	readonly MapRouteModal_i$:Writable$<MapRouteModal_I> = writable$(null)
	readonly Masterheadings_tab_div$:Writable$<HTMLDivElement> = writable$(null)
	readonly masterheadings_tab_section$:Writable$<HTMLDivElement> = writable$(null)
	readonly rest_details_map_div_a$:Writable$<HTMLDivElement[]> = writable$([])
	readonly rest_details_map_set$:Writable$<Set<HTMLDivElement>> = writable$(new Set())
	readonly restaurant_menu_tabs_ul$:Writable$<HTMLUListElement> = writable$(null)
	readonly visible_headings$:Writable$<Heading_I[]> = writable$(null)
	readonly goto_url$:Readable$<string> = derived$(this.restaurant_frame$,//region
		(restaurant_frame:RestaurantFrame_I)=>{
			return restaurant_frame?.goto_url
		}
	)//endregion
	readonly isDeliverable$:isDeliverable$_T = derived$(this.restaurant_frame$,//region
		(restaurant_frame:RestaurantFrame_I)=>{
			return restaurant_frame?.isDeliverable
		}
	)//endregion
	readonly list_view_icon$:Readable$<string> = derived$(this.platform_settings$,//region
		(platform_settings:PlatformSettings)=>{
			return list_view_icon_(platform_settings?.Color_Text1)
		})//endregion
	readonly is_rest_open$ = derived$(//region
		this.selected_menuitem$, selected_menuitem=>{
			return !!(
				has_dom
				&& selected_menuitem
				&& is_between_UTC_time(selected_menuitem.UTC_OpeningTime, selected_menuitem.UTC_ClosingTime)
			)
		}
	)//endregion
	readonly gallery_menuitems$ = this.restaurant_frame$.gallery_menuitems$
	readonly masterheadings$ = this.restaurant_frame$.masterheadings$
	readonly menu$:Readable$<SearchMenuitem_I> = derived$(this.restaurant_frame$,//region
		(restaurant_frame:RestaurantFrame_I)=>{
			return restaurant_frame?.menu
		}
	)//endregion
	readonly serviceType$:Readable$<string> = derived$(this.restaurant_frame$,//region
		(restaurant_frame:RestaurantFrame_I)=>{
			return restaurant_frame?.serviceType
		}
	)//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.unsubscribers.push(
			this.rest_details_map_div_a$.subscribe(()=>this.load_rest_map()),
			this.selected_masterheading$.subscribe(()=>this.update_selected_masterheading()),
		)
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_rest_map = async ()=>{
		if (!has_dom) return
		log(this.ctx, Controller_name, 'load_rest_map()')
		await this.init_google_maps_promise
		const rest_details_map_div_a = await subscribe_wait_timeout(
			this.rest_details_map_div_a$, I, timeout_ms
		)
		const Color_RestMapIcon = await subscribe_wait_timeout(
			this.Color_RestMapIcon$, I, timeout_ms
		)
		const menu = await subscribe_wait_timeout(
			this.menu$, neql_(undefined), timeout_ms
		)
		const rest_details_map_set = this.rest_details_map_set$.$
		for (const $rest_details_map of rest_details_map_div_a) {
			if (rest_details_map_set.has($rest_details_map) || !$rest_details_map) continue
			rest_details_map_set.add($rest_details_map)
			const LatLngLiteral = LatLngLiteral_(menu)
			const map_options = clone(DEFAULT_MAP_OPTIONS)
			map_options.center = LatLngLiteral
			map_options.gestureHandling = 'none'
			map_options.scrollwheel = false
			map_options.disableDoubleClickZoom = true
			const map = new
			google.maps.Map($rest_details_map, map_options)
			// Rest Marker
			MarkerWithPosition_({
				position: LatLngLiteral,
				map,
				icon: {
					url: fork_map_icon_(Color_RestMapIcon),
				},
				animation: google.maps.Animation.DROP,
			})
		}
	}
	readonly select_heading = (heading_idx:string)=>{
		document.querySelector(heading_idx)
			.scrollIntoView({ behavior: 'smooth', block: 'start' });

		// TODO: window scrolling is not working for some reason
		// const heading_element = this.heading_elements$.$[heading_idx]

		// window.scrollTo({
		// 	top:
		// 		heading_element.offsetTop
		// 		- this.Restaurant_ServiceTypeNav_ul_offsetBottom_()
		// 		- (3 * this.restaurant_menu_tabs_ul_offsetHeight_()),
		// 	behavior: 'smooth',
		// })
	}
	readonly Restaurant_ServiceTypeNav_ul_offsetBottom_ = ()=>{
		const Restaurant_ServiceTypeNav_ul = this.Restaurant_ServiceTypeNav_ul$.$
		if (!Restaurant_ServiceTypeNav_ul) return 0
		const { offsetHeight, offsetTop } = Restaurant_ServiceTypeNav_ul
		return offsetTop + offsetHeight
	}
	readonly restaurant_menu_tabs_ul_offsetHeight_ = ()=>{
		const restaurant_menu_tabs_ul = this.restaurant_menu_tabs_ul$.$
		if (!restaurant_menu_tabs_ul) return 0
		const { offsetHeight } = restaurant_menu_tabs_ul
		return offsetHeight
	}
	readonly select_masterheading = async (selected_masterheading:Masterheading)=>{
		this.selected_masterheading$.$ = selected_masterheading
		await this.update_selected_masterheading()
		log(this.ctx, Controller_name, 'selected_masterheading', selected_masterheading)
	}
	readonly open_MapRouteModal_i = async ()=>{
		log(this.ctx, Controller_name, 'open_MapRouteModal_i')
		if (this.has_userAddress$.$) {
			await this.MapRouteModal_i$.$.open({ restaurant: this.menu$.$ })
		} else {
			this.notyf_error('Please choose your address first')
		}
	}
	readonly update_selected_masterheading = async ()=>{
		if (!has_dom || this.restaurant_busy$.$ || !this.selected_menuitem$.$) return
		const Masterheadings_tab_div =
			await subscribe_wait_timeout(this.Masterheadings_tab_div$, I, timeout_ms)
		let Masterheadings_tab_div_top = Masterheadings_tab_div.getBoundingClientRect().top
		this.is_rest_heads_menu_fixed$.$ = Masterheadings_tab_div_top < 152 // `152` is the top position of `Masterheadings_tab_div$`
		const masterheadings_tab_section = this.masterheadings_tab_section$.$
		if (!masterheadings_tab_section) return
		Masterheadings_tab_div_top = masterheadings_tab_section.getBoundingClientRect().top
		// `HEADER.HEIGHT` is the top position of `masterheadings_tab_section`
		this.is_masterheadings_tab_section_fixed$.$ = Masterheadings_tab_div_top < HEADER.HEIGHT
		// `HEADER.HEIGHT` is the top position of `masterheadings_tab_section`
		this.is_masterheadings_tab_section_mobile_fixed$.$ = Masterheadings_tab_div_top < HEADER.HEIGHT
		// Active Heading
		const headings = this.selected_masterheading$.$?.heads || []
		const { length } = headings
		const heading_elements = this.heading_elements$.$
		const visible_headings:Heading_I[] = []
		const client_top = 72 + 86
		const client_bottom = document.documentElement.clientHeight
		for (let i = 0; i < length; i++) {
			const heading = headings[i]
			const heading_element = heading_elements[i]
			if (heading_element) {
				const { top, bottom } = heading_element.getBoundingClientRect()
				if (
					(top >= client_top && top <= client_bottom)
					|| (bottom >= client_top && bottom <= client_bottom)
					|| (top <= client_top && bottom >= client_bottom)
				) {
					visible_headings.push(heading)
				}
			}
		}
		this.visible_headings$.$ = visible_headings
	}
}
